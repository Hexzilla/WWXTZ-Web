import { UnityProvider } from 'contexts/UnityProvider';
import Play from './Play';

const unityConfig = {
  loaderUrl: 'Build/public.loader.js',
  dataUrl: 'Build/public.data.br',
  frameworkUrl: 'Build/public.framework.js.br',
  codeUrl: 'Build/public.wasm.br',
};

const Home = () => {
  return (
    <UnityProvider unityConfig={unityConfig}>
      <Play />
    </UnityProvider>
  );
};

export default Home;
