export const INSTALL_PLACEHOLDER = "<pet-slug--author-slug>";

export const BASH_INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- " +
  INSTALL_PLACEHOLDER;

export const POWERSHELL_INSTALL_COMMAND = `powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -UseB https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.ps1 | iex; Install-CodexPet ${INSTALL_PLACEHOLDER}"`;

export const LOCAL_INSTALL_COMMAND = `npm run install:pet -- ${INSTALL_PLACEHOLDER}`;

export function getPetInstallCommands(slug: string) {
  return {
    bash: BASH_INSTALL_COMMAND.replace(INSTALL_PLACEHOLDER, slug),
    powershell: POWERSHELL_INSTALL_COMMAND.replace(INSTALL_PLACEHOLDER, slug),
  };
}
