import React from "react";
import { useParams } from "react-router-dom";
import "../../css/forgortPassword.css";

function ForgotPassword() {
  const { id, token } = useParams();
  console.log(id, token);
  return (
    <div className="parent">
      <div className="grid-parent">
        <div className="one">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            veritatis et impedit debitis nostrum optio tempora dicta quis
            voluptate autem, laudantium deserunt, dolorum, praesentium
            voluptatum enim voluptatem inventore? Earum, neque.
          </p>
        </div>
        <div className="two">
          Lorem ipsum dolor sit amet consectetur adipisicing elit reiciendis
          ipsum? Blanditiis, odit quo! Debitis quisquam consectetur omnis
          laboriosam at asperiores fugiat, et nemo saepe! Minima vitae, autem
          nostrum earum rem recusandae. Tempora asperiores illo itaque ducimus,
          unde laudantium rem voluptates architecto id corporis. Minus quaerat
          aspernatur hic nihil et! Quibusdam quis delectus qui sequi
          Reprehenderit vel dolor nesciunt natus! Sequi, officiis id totam ab
          beatae sint quidem, aliquid at eos et, amet adipisci quam! Soluta
          exercitationem deserunt atque unde quis quos quaerat, amet officia.
          Temporibus, pariatur. Aut recusandae commodi maxime, ipsam culpa non
          dolores unde nam sed fugiat adipisci, aliquid pariatur alias labore
          porro cumque? Quo, molestias ipsa? Ipsum rem quam quaerat eveniet.
          Odit. Fugit quia incidunt consectetur inventore blanditiis suscipit
          soluta!
        </div>
        <div className="three"></div>
        <div className="four"></div>
        <div className="five"></div>
        <div className="six"></div>
      </div>
    </div>
  );
}

export default ForgotPassword;
