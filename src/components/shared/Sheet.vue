<script setup lang="ts">
import { Button } from '@/components/ui/button'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
    <Sheet>
        <SheetTrigger as-child>
            <slot name="trigger"></slot>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    <slot name="title"></slot>
                </SheetTitle>
                <SheetDescription>
                    <slot name="description"></slot>
                </SheetDescription>
            </SheetHeader>
            <slot name="content"></slot>
            <SheetFooter>
                <SheetClose as-child>
                    <Button type="submit" class="mt-4">
                        Close
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>