import { Directive, DirectiveBinding, toRaw } from "vue";
import { useDateFormat } from "@vueuse/core";
export const dateFormat: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    console.log(value, "value");
    if (value) {
      el.innerText = useDateFormat(value, "YYYY-MM-DD").value;
    }
  },
};
