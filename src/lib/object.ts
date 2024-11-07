import { SelectItem } from "@/components/shared/select/select.vue";

export function tempArray() {
    const array: SelectItem[] = [];
    for (let i = 5; i < 31; i++) {
        if (i === 5) {
            array.push({
                label: "Aus",
                val: "0",
            });
        }
        array.push({
            label: i.toString(),
            val: i.toString(),
        });
    }
    return array;
}