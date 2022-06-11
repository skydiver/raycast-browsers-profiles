import fs from "fs";
import os from "os";
import ini from "ini";

import browsers from "./supported-browsers.json";

type FirefoxProfile = {
  name: string;
  icon: string;
  browser: string;
};

export const getFirefoxProfiles = () => {
  const profiles: FirefoxProfile[] = [];

  browsers.firefox.forEach((browser) => {
    const path = `${os.homedir()}${browser.path}`;
    const exists = fs.existsSync(path);

    if (!exists) {
      return null;
    }

    const file = fs.readFileSync(`${path}/profiles.ini`, "utf-8");
    const config = ini.parse(file);

    Object.values(config).forEach((profile) => {
      if (!profile.Name) {
        return null;
      }

      profiles.push({
        name: profile.Name,
        icon: browser.icon,
        browser: browser.name,
      });
    });
  });

  return profiles;
};
