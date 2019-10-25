package mtr.slot;

import net.minecraft.item.ItemBlock;
import net.minecraft.item.ItemPickaxe;
import net.minecraft.item.ItemStack;
import net.minecraftforge.items.IItemHandler;
import net.minecraftforge.items.SlotItemHandler;

public class SlotBlockPickaxeOnly extends SlotItemHandler {

	public SlotBlockPickaxeOnly(IItemHandler itemHandler, int index, int xPosition, int yPosition) {
		super(itemHandler, index, xPosition, yPosition);
	}

	@Override
	public boolean isItemValid(ItemStack stack) {
		return isValid(stack);
	}

	public static boolean isValid(ItemStack stack) {
		return stack.getItem() instanceof ItemBlock || stack.getItem() instanceof ItemPickaxe;
	}
}
