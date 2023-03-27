import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useWallet } from "contexts/WalletProvider";
import { useUnityContext } from "contexts/UnityProvider";
import Unity, { UnityEventListener } from "components/unity/Unity";

const Play = () => {
  const { tezos, connectWallet } = useWallet();
  const { unityContext } = useUnityContext();
  // const { isLoaded, sendMessage, requestFullscreen } = unityContext;
  const { sendMessage } = unityContext;

  /*const setFullScreen = useCallback(() => {
    isLoaded && requestFullscreen(false);
  }, [isLoaded, requestFullscreen]);*/

  /*useEffect(() => {
    (async () => {
      if (isLoaded && address) {
        // Send wallet connected state.
        sendMessage("GFT", "WalletConnected", address);
      }
    })();
  }, [isLoaded, sendMessage, address]);*/

  // Event Listener for transaction
  const onSendTransaction = useCallback(
    async (amount: number) => {
      try {
        console.log("onSendTransaction", amount);
        await connectWallet();

        console.log("Request Transaction", amount);
        const op = await tezos.wallet
          .transfer({ to: "tz1M2hCvF5AhhbQAkn3LcZ8DTNBggyAKTCvo", amount })
          .send();

        await op.confirmation();

        sendMessage("GFT", "TransactionComplete");
        toast.success("Transaction Success");
        return;
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
        sendMessage("GFT", "TransactionFailed");
      }
    },
    [tezos, connectWallet, sendMessage]
  );

  const onSendScore = useCallback(async (score: number) => {
    console.log("onSendScore", score);
  }, []);

  const eventListeners = useMemo((): UnityEventListener[] => {
    return [
      { eventName: "SendTransaction", callback: onSendTransaction },
      { eventName: "SendScore", callback: onSendScore },
    ];
  }, [onSendTransaction, onSendScore]);

  return (
    <div className="container mx-auto mt-4 fullscreen">
      <Unity
        unityContext={unityContext}
        eventListeners={eventListeners}
        styles={{
          height: 540,
          width: 950,
          background: "#555",
        }}
      ></Unity>
    </div>
  );
};

export default Play;
