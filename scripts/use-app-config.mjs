import { copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const variants = {
  working: 'app.working.json',
  broken: 'app.broken.json',
};

const variant = process.argv[2];

if (!Object.hasOwn(variants, variant)) {
  console.error('Usage: node scripts/use-app-config.mjs <working|broken>');
  process.exit(1);
}

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

copyFileSync(join(projectRoot, variants[variant]), join(projectRoot, 'app.json'));

console.log(
  `app.json now matches ${variants[variant]}. Run "npm run prebuild:android" before building.`
);
