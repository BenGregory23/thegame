import type { ICard } from "~~/shared/types/types";

export const useHand = () => {


    function sortHand(playerHand: ICard[]) {
        playerHand.sort((a, b) => a.value - b.value);
    }


    return {
        sortHand,
    }
}