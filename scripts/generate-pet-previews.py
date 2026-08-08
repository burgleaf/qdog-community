#!/usr/bin/env python3
"""Generate QA sheets and web-ready animations from Codex pet spritesheets."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

COLUMNS = 8
V1_ROWS = 9
V2_ROWS = 11
CELL_WIDTH = 192
CELL_HEIGHT = 208
GIF_SCALE = 2
GIF_SIZE = (CELL_WIDTH * GIF_SCALE, CELL_HEIGHT * GIF_SCALE)
THUMBNAIL_SCALE = 2
THUMBNAIL_SIZE = (CELL_WIDTH * THUMBNAIL_SCALE, CELL_HEIGHT * THUMBNAIL_SCALE)
LABEL_HEIGHT = 22
WEBP_QUALITY = 90
WEBP_METHOD = 4

STANDARD_STATES = [
    ("idle", 0, [280, 110, 110, 140, 140, 320]),
    ("running-right", 1, [120, 120, 120, 120, 120, 120, 120, 220]),
    ("running-left", 2, [120, 120, 120, 120, 120, 120, 120, 220]),
    ("waving", 3, [140, 140, 140, 280]),
    ("jumping", 4, [140, 140, 140, 140, 280]),
    ("failed", 5, [140, 140, 140, 140, 140, 140, 140, 240]),
    ("waiting", 6, [150, 150, 150, 150, 150, 260]),
    ("running", 7, [120, 120, 120, 120, 120, 220]),
    ("review", 8, [150, 150, 150, 150, 150, 280]),
]

LOOK_STATES = [
    ("look-000-157", 9, [160, 160, 160, 160, 160, 160, 160, 260]),
    ("look-180-337", 10, [160, 160, 160, 160, 160, 160, 160, 260]),
]


def checker(size: tuple[int, int], square: int = 16) -> Image.Image:
    image = Image.new("RGB", size, "#ffffff")
    draw = ImageDraw.Draw(image)
    for y in range(0, size[1], square):
        for x in range(0, size[0], square):
            if (x // square + y // square) % 2:
                draw.rectangle((x, y, x + square - 1, y + square - 1), fill="#e8e8e8")
    return image


def extract_frame(atlas: Image.Image, row: int, column: int) -> Image.Image:
    return atlas.crop(
        (
            column * CELL_WIDTH,
            row * CELL_HEIGHT,
            (column + 1) * CELL_WIDTH,
            (row + 1) * CELL_HEIGHT,
        )
    ).convert("RGBA")


def frame_with_background(atlas: Image.Image, row: int, column: int) -> Image.Image:
    frame = extract_frame(atlas, row, column)
    background = checker((CELL_WIDTH, CELL_HEIGHT))
    background.paste(frame, (0, 0), frame)
    return background


def make_thumbnail(atlas: Image.Image, output: Path) -> None:
    frame = extract_frame(atlas, 0, 0)
    frame = frame.resize(THUMBNAIL_SIZE, Image.Resampling.NEAREST)
    output.parent.mkdir(parents=True, exist_ok=True)
    frame.save(output)


def make_contact_sheet(
    atlas: Image.Image,
    states: list[tuple[str, int, list[int]]],
    output: Path,
    scale: float = 0.5,
) -> None:
    cell_w = max(1, round(CELL_WIDTH * scale))
    cell_h = max(1, round(CELL_HEIGHT * scale))
    width = COLUMNS * cell_w
    height = len(states) * (cell_h + LABEL_HEIGHT)
    sheet = Image.new("RGB", (width, height), "#f7f7f7")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for state, row, durations in states:
        y = row * (cell_h + LABEL_HEIGHT)
        draw.rectangle((0, y, width, y + LABEL_HEIGHT - 1), fill="#111111")
        draw.text((6, y + 5), f"row {row}: {state}", fill="#ffffff", font=font)
        draw.text((width - 92, y + 5), f"{len(durations)} frames", fill="#ffffff", font=font)

        for column in range(COLUMNS):
            frame = frame_with_background(atlas, row, column)
            frame = frame.resize((cell_w, cell_h), Image.Resampling.LANCZOS)
            x = column * cell_w
            sheet.paste(frame, (x, y + LABEL_HEIGHT))
            outline = "#18a058" if column < len(durations) else "#cc3344"
            draw.rectangle(
                (x, y + LABEL_HEIGHT, x + cell_w - 1, y + LABEL_HEIGHT + cell_h - 1),
                outline=outline,
            )
            draw.text((x + 4, y + LABEL_HEIGHT + 4), str(column), fill="#111111", font=font)

    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output)


def make_gif(atlas: Image.Image, state: str, row: int, durations: list[int], output: Path) -> None:
    frames = [extract_frame(atlas, row, column) for column in range(len(durations))]
    frames = [frame.resize(GIF_SIZE, Image.Resampling.NEAREST) for frame in frames]
    output.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=False,
        disposal=2,
    )
    with Image.open(output) as generated:
        if generated.size != GIF_SIZE:
            raise ValueError(f"{output} must be {GIF_SIZE[0]}x{GIF_SIZE[1]}, got {generated.size[0]}x{generated.size[1]}")


def make_webp(atlas: Image.Image, state: str, row: int, durations: list[int], output: Path) -> None:
    frames = [extract_frame(atlas, row, column) for column in range(len(durations))]
    frames = [frame.resize(GIF_SIZE, Image.Resampling.NEAREST) for frame in frames]
    output.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        lossless=False,
        quality=WEBP_QUALITY,
        method=WEBP_METHOD,
        exact=True,
    )
    with Image.open(output) as generated:
        if generated.size != GIF_SIZE:
            raise ValueError(f"{output} must be {GIF_SIZE[0]}x{GIF_SIZE[1]}, got {generated.size[0]}x{generated.size[1]}")


def generate_for_pet(pet_dir: Path) -> None:
    spritesheet = pet_dir / "spritesheet.webp"
    pet_json = pet_dir / "pet.json"
    if not spritesheet.exists() or not pet_json.exists():
        return

    metadata = json.loads(pet_json.read_text(encoding="utf-8"))
    sprite_version_number = metadata.get("spriteVersionNumber", 1)
    if sprite_version_number not in (1, 2):
        raise ValueError(f"{pet_json} spriteVersionNumber must be 1, 2, or omitted for v1")

    row_count = V2_ROWS if sprite_version_number == 2 else V1_ROWS
    states = STANDARD_STATES + (LOOK_STATES if sprite_version_number == 2 else [])

    with Image.open(spritesheet) as opened:
        atlas = opened.convert("RGBA")

    expected_size = (COLUMNS * CELL_WIDTH, row_count * CELL_HEIGHT)
    if atlas.size != expected_size:
        raise ValueError(f"{spritesheet} must be {expected_size[0]}x{expected_size[1]}, got {atlas.size[0]}x{atlas.size[1]}")

    repo_root = Path(__file__).resolve().parents[1]
    preview_dir = repo_root / "assets" / "previews" / pet_dir.name
    make_thumbnail(atlas, preview_dir / "thumbnail.png")
    make_contact_sheet(atlas, states, preview_dir / "contact-sheet.png")
    for state, row, durations in states:
        make_gif(atlas, state, row, durations, preview_dir / "gifs" / f"{state}.gif")
        make_webp(atlas, state, row, durations, preview_dir / "webp" / f"{state}.webp")

    print(f"generated previews for {pet_dir.name}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "pet_ids",
        nargs="*",
        help="Optional pet directory names. Omit to generate previews for every pet.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    pets_dir = repo_root / "pets"
    pet_dirs = (
        [pets_dir / pet_id for pet_id in args.pet_ids]
        if args.pet_ids
        else sorted(pets_dir.iterdir())
    )
    for pet_dir in pet_dirs:
        if pet_dir.name.startswith("."):
            continue
        if not pet_dir.is_dir():
            raise ValueError(f"unknown pet directory: {pet_dir.name}")
        generate_for_pet(pet_dir)


if __name__ == "__main__":
    main()
