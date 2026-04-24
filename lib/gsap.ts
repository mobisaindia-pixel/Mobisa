import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { SplitText } from "gsap/SplitText";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, SplitText, InertiaPlugin, MorphSVGPlugin);
}

export { ScrollTrigger, Draggable, SplitText, InertiaPlugin, MorphSVGPlugin };
export default gsap;
