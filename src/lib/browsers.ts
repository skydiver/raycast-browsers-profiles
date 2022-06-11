import { exec } from "child_process";

/*****************************************************************************
 * Launch Chromium browsers
 ****************************************************************************/
export const launchChromium = (app: string, profile: string) => {
  exec(`open -n -a "${app}" --args --profile-directory="${profile}"`);
};
