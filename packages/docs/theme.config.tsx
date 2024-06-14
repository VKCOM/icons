import { Button } from '@vkontakte/vkui';
import iconPackageInfo from '@vkontakte/icons/package.json';
import { DocsThemeConfig, Icon20GitHub } from './vkui-nextra-theme';
import { SelectMimicry } from './components/SelectMimicry/SelectMimicry';

const afterLinks = [
  {
    'aria-label': 'GitHub',
    'href': 'https://github.com/VKCOM/icons',
    'before': (
      <Icon20GitHub width={24} height={24} style={{ color: 'var(--vkui--color_icon_medium)' }} />
    ),
  },
];

const config: DocsThemeConfig = {
  header: {
    selectedHref: 'https://vkcom.github.io/icons/',
    after: (
      <>
        {afterLinks.map((props, i) => (
          <Button
            key={i}
            size="l"
            appearance="neutral"
            mode="secondary"
            target="_blank"
            style={{ lineHeight: 0 }} // FIXME(VKUI): check this
            {...props}
          />
        ))}
        <SelectMimicry href="https://github.com/VKCOM/icons/tags" target="_blank">
          v{iconPackageInfo.version}
        </SelectMimicry>
      </>
    ),
  },
};

export default config;
