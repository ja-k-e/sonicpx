import App from './components/App';

const VERSION = '0.1';

console.info(
  `
%cSonicPX v${VERSION}
%c© Jake Albaugh ${new Date().getFullYear()}
https://twitter.com/jake_albaugh
https://github.com/jakealbaugh/sonicpx

`,
  'font-family: sans-serif; font-weight: bold;',
  'font-family: sans-serif; font-weight: normal;'
);

new App();
