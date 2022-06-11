import fs from "fs";
import os from "os";

import browsers from "./supported-browsers.json";

type ChromiumProfile = {
  name: string;
  icon: string;
  browser: string;
};

export const getChromiumProfiles = () => {
  const profiles: ChromiumProfile[] = [];

  browsers.chromium.forEach((browser) => {
    const path = `${os.homedir()}${browser.path}`;
    const exists = fs.existsSync(path);

    if (!exists) {
      return null;
    }

    const directories = fs.readdirSync(path);

    directories.forEach((directory) => {
      const preferences = `${path}/${directory}/Preferences`;

      if (directory === "System Profile" || !fs.existsSync(preferences)) {
        return null;
      }

      const file = fs.readFileSync(preferences, "utf-8");
      const profile = JSON.parse(file);

      profiles.push({
        name: profile.profile.name,
        icon: browser.icon,
        browser: browser.name,
      });
    });
  });

  return profiles;
};
