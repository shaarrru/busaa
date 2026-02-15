const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".imessage-send-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
    .to(".imessage-send-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" })
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, { scale: 1.2, x: 10, backgroundColor: "rgb(255, 105, 180)", color: "#fff" })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans, "+=1.5")
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5") 
    
    .staggerFrom(".idea-6 span", 0.8, { scale: 2, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 1.2, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2)
    
    /* NO DELAY: The "-=1" makes it start as "Aaaa" is still fading out */
    .staggerFromTo(".baloons img", 8, { 
        opacity: 0, 
        y: -1000, 
        rotation: "random(-45, 45)", 
        x: "0" 
    }, { 
        opacity: 1, 
        y: 1600, 
        rotation: "random(-120, 120)", 
        x: "random(-40, 40)", 
        ease: Power1.easeInOut 
    }, 0.05, "-=1")
    
    .from(".girl-dp", 0.5, { scale: 1.8, opacity: 0 }, "-=6") 
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -30, rotation: 15, ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { 
        scale: 1, 
        rotationY: 0, 
        color: "#ff69b4", 
        ease: Expo.easeOut 
    }, 0.1, "party")
    .to(".six", 0.5, { opacity: 0, y: 20, zIndex: "-1" }, "+=2")
    .to(".last-img", 2.5, { opacity: 1, ease: Power1.easeInOut });

  document.getElementById("replay").addEventListener("click", () => { tl.restart(); });
};

const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((customData) => {
        if (data[customData] !== "") {
          const el = document.getElementById(customData);
          if (customData === "imagePath") {
            if(el) el.setAttribute("src", data[customData]);
          } else if (el) {
            el.innerText = data[customData];
          }
        }
      });
    });
};

const resolveFetch = () => {
  return new Promise((resolve) => {
    fetchData();
    resolve("Fetch done!");
  });
};

resolveFetch().then(animationTimeline());