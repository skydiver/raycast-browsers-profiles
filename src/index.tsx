import { ActionPanel, Detail, List, Icon, Action } from "@raycast/api";

import { getFirefoxProfiles } from "./lib/firefox";
import { getChromiumProfiles } from "./lib/chromium";

export default function Command() {
  const chromiumProfiles = getChromiumProfiles();
  const firefoxProfiles = getFirefoxProfiles();

  const browsers = [...chromiumProfiles, ...firefoxProfiles];

  return (
    <List>
      {browsers.map((browser, index) => (
        <List.Section key={`browser-section-${index}`} title={browser.name}>
          {browser.profiles.map((profile, pindex) => (
            <List.Item
              key={`firefox-profile-${pindex}`}
              icon={{ source: `icons/${profile.icon}` }}
              title={profile.name}
              accessories={[{ text: "Launch this profile", icon: Icon.Globe }]}
              actions={
                <ActionPanel>
                  <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
