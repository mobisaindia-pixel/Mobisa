import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { Draggable } from "gsap-trial/Draggable";
import { SplitText } from "gsap-trial/SplitText";
import { InertiaPlugin } from "gsap-trial/InertiaPlugin";
import { MorphSVGPlugin } from "gsap-trial/MorphSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, SplitText, InertiaPlugin, MorphSVGPlugin);
}

export { ScrollTrigger, Draggable, SplitText, InertiaPlugin, MorphSVGPlugin };
export default gsap;
