import fs from "fs";
import os from "os";
import ini from "ini";

import browsers from "./supported-browsers.json";

type FirefoxProfiles = {
  name: string;
  profiles: FirefoxProfile[];
};

type FirefoxProfile = {
  name: string;
  icon: string;
  browser: string;
};

export const getFirefoxProfiles = () => {
  const profiles: FirefoxProfiles[] = [];

  browsers.firefox.forEach((browser) => {
    const path = `${os.homedir()}${browser.path}`;
    const exists = fs.existsSync(path);

    if (!exists) {
      return null;
    }

    const file = fs.readFileSync(`${path}/profiles.ini`, "utf-8");
    const config = ini.parse(file);

    const browserProfiles: FirefoxProfile[] = [];

    Object.values(config).forEach((profile) => {
      if (!profile.Name) {
        return null;
      }

      browserProfiles.push({
        name: profile.Name,
        icon: browser.icon,
        browser: browser.title,
      });
    });

    profiles.push({
      name: browser.title,
      profiles: browserProfiles,
    });
  });

  return profiles;
};
