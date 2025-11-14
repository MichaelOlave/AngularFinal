import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Each resource you can mine
interface Block {
  id: string;
  name: string;
  icon: string;
  clickValue: number;
  quantity: number;
  blockCost: number;
  blockCostMultiplier: number;
  toolIcon: string;
  managerPurchased: boolean;
  managerEnabled: boolean;
  managerCost: number;
  clickInterval: number;
  progress: number;
  unlocked: boolean;
  animationIds: number[];
}

// Permanent bonuses you can buy
interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: () => void;
  purchased: boolean;
}

@Component({
  selector: 'app-mineclick',
  imports: [CommonModule],
  templateUrl: './mineclick.html',
  styleUrl: './mineclick.css',
})
export class Mineclick implements OnInit, OnDestroy {
  logo = '/sean/media/logo.png';
  background = '/sean/media/bg.png';

  dirtBlocks = 0;
  blocksPerSecond = 0;
  profitMultiplier = 1;
  speedMultiplier = 1;
  costReduction = 0;
  clickProfitMultiplier = 1;
  availableUpgrades: Upgrade[] = [];

  private progressInterval: any;
  private animationCounter = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  blocksData: Block[] = [
    { id: 'dirt', name: 'Dirt Block', icon: '/sean/media/blocks/dirt.png', clickValue: 1, quantity: 1, blockCost: 10, blockCostMultiplier: 1.15, toolIcon: '/sean/media/managers/shovel.png', managerPurchased: false, managerEnabled: false, managerCost: 100, clickInterval: 500, progress: 0, unlocked: true, animationIds: [] },
    { id: 'wood', name: 'Oak Log', icon: '/sean/media/blocks/wood.png', clickValue: 7, quantity: 0, blockCost: 100, blockCostMultiplier: 1.15, toolIcon: '/sean/media/managers/axe.png', managerPurchased: false, managerEnabled: false, managerCost: 500, clickInterval: 1500, progress: 0, unlocked: false, animationIds: [] },
    { id: 'stone', name: 'Stone', icon: '/sean/media/blocks/stone.png', clickValue: 30, quantity: 0, blockCost: 1000, blockCostMultiplier: 1.15, toolIcon: '/sean/media/managers/pickaxe.png', managerPurchased: false, managerEnabled: false, managerCost: 2000, clickInterval: 3000, progress: 0, unlocked: false, animationIds: [] },
    { id: 'gold', name: 'Gold Ore', icon: '/sean/media/blocks/gold.png', clickValue: 150, quantity: 0, blockCost: 10000, blockCostMultiplier: 1.15, toolIcon: '/sean/media/managers/pickaxe.png', managerPurchased: false, managerEnabled: false, managerCost: 5000, clickInterval: 9000, progress: 0, unlocked: false, animationIds: [] },
    { id: 'iron', name: 'Iron Ore', icon: '/sean/media/blocks/iron.png', clickValue: 900, quantity: 0, blockCost: 100000, blockCostMultiplier: 1.15, toolIcon: '/sean/media/managers/pickaxe.png', managerPurchased: false, managerEnabled: false, managerCost: 20000, clickInterval: 20000, progress: 0, unlocked: false, animationIds: [] },
    { id: 'diamond', name: 'Diamond Ore', icon: '/sean/media/blocks/diamond.png', clickValue: 6000, quantity: 0, blockCost: 1000000, blockCostMultiplier: 1.15, toolIcon: '/sean/media/managers/pickaxe.png', managerPurchased: false, managerEnabled: false, managerCost: 100000, clickInterval: 50000, progress: 0, unlocked: false, animationIds: [] },
  ];

  upgrades: Upgrade[] = [
    { id: 'speed1', name: 'Efficiency I', description: 'All managers work 40% faster', cost: 5000, effect: () => this.speedMultiplier *= 1.4, purchased: false },
    { id: 'profit1', name: 'Fortune I', description: 'All blocks produce 2.5x more', cost: 10000, effect: () => this.profitMultiplier *= 2.5, purchased: false },
    { id: 'profit2', name: 'Fortune II', description: 'All blocks produce 4x more', cost: 50000, effect: () => this.profitMultiplier *= 4, purchased: false },
    { id: 'looting', name: 'Looting', description: 'Clicking blocks gives 8x profit', cost: 20000, effect: () => this.clickProfitMultiplier *= 8, purchased: false },
    { id: 'speed2', name: 'Efficiency II', description: 'All managers work 80% faster', cost: 100000, effect: () => this.speedMultiplier *= 1.8, purchased: false },
  ];

  ngOnInit(): void {
    this.updateAvailableUpgrades();
    this.updateBlocksPerSecond();
    this.progressInterval = setInterval(() => this.updateProgress(), 50);
    this.checkUnlocks();
  }

  ngOnDestroy(): void {
    if (this.progressInterval) clearInterval(this.progressInterval);
  }

  // main game loop, runs every 50ms
  updateProgress(): void {
    let totalProduction = 0;

    this.blocksData.forEach((block) => {
      if (block.managerPurchased && block.managerEnabled && block.quantity > 0) {
        const effectiveInterval = block.clickInterval / this.speedMultiplier;
        const oldProgress = block.progress;
        block.progress = Math.min(100, block.progress + (50 / effectiveInterval) * 100);
        
        if (oldProgress < 100 && block.progress >= 100) {
          totalProduction += block.clickValue * block.quantity * this.profitMultiplier;
          block.progress = 0;
          const animId = ++this.animationCounter;
          block.animationIds.push(animId);
          setTimeout(() => {
            const index = block.animationIds.indexOf(animId);
            if (index > -1) block.animationIds.splice(index, 1);
          }, 1200);
        } else if (block.progress >= 100) {
          block.progress = 0;
        }
      } else if (block.progress !== 0) {
        block.progress = 0;
      }
    });

    if (totalProduction > 0) {
      this.dirtBlocks += totalProduction;
      this.updateBlocksPerSecond();
      this.checkUnlocks();
      this.cdr.detectChanges();
    }
  }

  updateBlocksPerSecond(): void {
    this.blocksPerSecond = 0;
    this.blocksData.forEach((block) => {
      if (block.managerPurchased && block.managerEnabled && block.quantity > 0) {
        const effectiveInterval = block.clickInterval / this.speedMultiplier;
        const clicksPerSecond = (1000 / effectiveInterval) * block.quantity;
        this.blocksPerSecond += block.clickValue * clicksPerSecond * this.profitMultiplier;
      }
    });
  }

  checkUnlocks(): void {
    const thresholds = [100, 1000, 10000, 100000, 1000000];
    thresholds.forEach((threshold, i) => {
      if (this.dirtBlocks >= threshold && !this.blocksData[i + 1].unlocked) {
        this.blocksData[i + 1].unlocked = true;
        this.blocksData[i + 1].quantity = 1;
      }
    });
  }

  clickBlock(block: Block): void {
    if (block.unlocked && block.quantity > 0) {
      this.dirtBlocks += block.clickValue * block.quantity * this.profitMultiplier * this.clickProfitMultiplier;
      this.checkUnlocks();
    }
  }

  getBlockCost(block: Block): number {
    return Math.max(1, Math.floor(block.blockCost * (1 - this.costReduction)));
  }

  getMaxAffordable(block: Block): number {
    if (!block.unlocked) return 0;
    let max = 0, cost = this.getBlockCost(block), totalCost = 0;
    while (totalCost + cost <= this.dirtBlocks) {
      totalCost += cost;
      max++;
      cost = Math.floor(cost * block.blockCostMultiplier * (1 - this.costReduction));
    }
    return max;
  }

  buyBlocks(block: Block): void {
    if (!block.unlocked) return;
    const max = this.getMaxAffordable(block);
    if (max === 0) return;
    
    let totalCost = 0, cost = this.getBlockCost(block), quantity = 0;
    for (let i = 0; i < max && totalCost + cost <= this.dirtBlocks; i++) {
      totalCost += cost;
      quantity++;
      cost = Math.floor(cost * block.blockCostMultiplier * (1 - this.costReduction));
    }
    
    if (totalCost <= this.dirtBlocks && quantity > 0) {
      this.dirtBlocks -= totalCost;
      block.quantity += quantity;
      block.blockCost = cost / (1 - this.costReduction || 1);
      this.updateBlocksPerSecond();
      this.checkUnlocks();
    }
  }

  buyManager(block: Block): void {
    if (!block.unlocked || block.managerPurchased || this.dirtBlocks < block.managerCost) return;
    this.dirtBlocks -= block.managerCost;
    block.managerPurchased = true;
    block.managerEnabled = true;
    this.updateBlocksPerSecond();
  }

  toggleManager(block: Block): void {
    if (block.managerPurchased) {
      block.managerEnabled = !block.managerEnabled;
      block.progress = 0;
      block.animationIds = [];
      this.updateBlocksPerSecond();
    }
  }

  purchaseUpgrade(upgrade: Upgrade): void {
    if (upgrade.purchased || this.dirtBlocks < upgrade.cost) return;
    this.dirtBlocks -= upgrade.cost;
    upgrade.purchased = true;
    upgrade.effect();
    this.updateAvailableUpgrades();
  }

  getProductionRate(block: Block): number {
    if (!block.managerPurchased || !block.managerEnabled || block.quantity === 0) return 0;
    const effectiveInterval = block.clickInterval / this.speedMultiplier;
    const clicksPerSecond = (1000 / effectiveInterval) * block.quantity;
    return block.clickValue * clicksPerSecond * this.profitMultiplier;
  }

  canAfford(cost: number): boolean {
    return this.dirtBlocks >= cost;
  }

  getBuyButtonText(block: Block): string {
    if (!block.unlocked) return 'Locked';
    const max = this.getMaxAffordable(block);
    return `Buy ${max}x ${block.name.toLowerCase()}${max !== 1 ? 's' : ''}`;
  }

  updateAvailableUpgrades(): void {
    this.availableUpgrades = this.upgrades.filter(upgrade => !upgrade.purchased);
  }
}
