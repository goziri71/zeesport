import SecondHeader from "../../components/SecondHeader";
import AppLayout from "../../layout/AppLayout";
import Hommee from "./Hommee";
import { useEffect } from "react";

function Sport() {
  const controller = new AbortController();
  useEffect(() => {
    (() => {
      //window.location.reload(true);
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <AppLayout>
        <SecondHeader />
        {/* <Hommee /> */}
      </AppLayout>
    </div>
  );
}

export default Sport;
