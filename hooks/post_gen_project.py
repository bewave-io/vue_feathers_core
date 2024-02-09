from __future__ import annotations

from typing import Any

import json
import os
import shutil


def remove_quasar_files() -> None:
    file_names = ["quasar.config.js", "src/quasar.d.ts"]
    for file_name in file_names:
        os.remove(f"frontend/{file_name}")
    shutil.rmtree("frontend/src/boot")


def remove_keys(data: dict[str, Any], to_remove: list[str]) -> dict[str, Any]:
    return {k: v for k, v in sorted(data.items()) if k not in to_remove}


def update_package_json(
    path: str,
    remove_deps: list[str] | None = None,
    scripts: dict[str, str] | None = None,
) -> None:
    with open(path) as f:
        package = json.load(f)

    if remove_deps:
        package |= {
            "dependencies": remove_keys(package["dependencies"], remove_deps),
            "devDependencies": remove_keys(package["devDependencies"], remove_deps),
        }

    package["scripts"] |= scripts or {}

    with open(path, 'w') as f:
        json.dump(package, f, indent=2, ensure_ascii=False)
        f.write('\n')


def main() -> None:
    if "{{ cookiecutter.frontend_framework }}".lower() == "quasar":
        update_package_json("frontend/package.json", scripts={"build": "quasar build", "dev": "quasar dev"})
    else:
        quasar_deps = ["quasar", "@quasar/extras", "@quasar/app-vite"]
        update_package_json("frontend/package.json", quasar_deps)
        remove_quasar_files()


if __name__ == "__main__":
    main()
