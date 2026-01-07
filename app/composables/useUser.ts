import { ref } from "vue";
import { generateGuestNumber } from "~/lib/utils";

const username = ref("Guest" + generateGuestNumber());

export const useUser = () => {

    return {
        username
    }
} 