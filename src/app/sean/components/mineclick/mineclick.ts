import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// This is what a Block looks like. Each resource you can mine is a Block.
interface Block {
  id: string;
  name: string;
  icon: string;              // where the block image is stored
  clickValue: number;        // how much money you get when you click it
  quantity: number;          // how many of this block you own
  blockCost: number;         // how much it costs to buy one more
  blockCostMultiplier: number; // each block costs more than the last one
  toolIcon: string;          // where the manager tool image is stored
  managerPurchased: boolean; // did you buy the auto clicker yet?
  managerEnabled: boolean;    // is the auto clicker turned on?
  managerCost: number;       // how much the auto clicker costs
  clickInterval: number;     // how long between auto clicks (in milliseconds)
  progress: number;          // progress bar from 0 to 100 for next auto click
  unlocked: boolean;         // can you see and buy this block yet?
  animationIds: number[];    // list of rising block animations playing right now
}

// This is what an Upgrade looks like. Permanent bonuses you can buy.
interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: () => void;        // this function runs when you buy the upgrade
  purchased: boolean;
}

@Component({
  selector: 'app-mineclick',
  imports: [CommonModule],
  templateUrl: './mineclick.html',
  styleUrl: './mineclick.css',
})
export class Mineclick implements OnInit, OnDestroy {
  // images for the game
  logo = '/sean/media/logo.png';
  background = '/sean/media/bg.png';

  // your money and multipliers
  dirtBlocks = 0;                    // your currency (blocks)
  blocksPerSecond = 0;               // how much money you make per second
  profitMultiplier = 1;              // multiplies all production from upgrades
  speedMultiplier = 1;               // makes managers work faster from upgrades
  costReduction = 0;                 // reduces block costs from upgrades
  clickProfitMultiplier = 1;         // multiplies click profits from Looting upgrade
  
  // list of upgrades you can still buy
  availableUpgrades: Upgrade[] = [];

  // private stuff for the game loop
  private progressInterval: any;      // timer that runs the game loop
  private animationCounter = 0;       // gives each animation a unique ID

  constructor(private cdr: ChangeDetectorRef) {}

  // all the different blocks you can mine
  blocksData: Block[] = [
    { 
      id: 'dirt', name: 'Dirt Block', 
      icon: '/sean/media/blocks/dirt.png', 
      clickValue: 1, quantity: 1, 
      blockCost: 10, blockCostMultiplier: 1.15, 
      toolIcon: '/sean/media/managers/shovel.png', 
      managerPurchased: false, managerEnabled: false, managerCost: 100, 
      clickInterval: 500, progress: 0, unlocked: true, animationIds: [] 
    },
    { 
      id: 'wood', name: 'Oak Log', 
      icon: '/sean/media/blocks/wood.png', 
      clickValue: 7, quantity: 0, 
      blockCost: 100, blockCostMultiplier: 1.15, 
      toolIcon: '/sean/media/managers/axe.png', 
      managerPurchased: false, managerEnabled: false, managerCost: 500, 
      clickInterval: 1500, progress: 0, unlocked: false, animationIds: [] 
    },
    { 
      id: 'stone', name: 'Stone', 
      icon: '/sean/media/blocks/stone.png', 
      clickValue: 30, quantity: 0, 
      blockCost: 1000, blockCostMultiplier: 1.15, 
      toolIcon: '/sean/media/managers/pickaxe.png', 
      managerPurchased: false, managerEnabled: false, managerCost: 2000, 
      clickInterval: 3000, progress: 0, unlocked: false, animationIds: [] 
    },
    { 
      id: 'gold', name: 'Gold Ore', 
      icon: '/sean/media/blocks/gold.png', 
      clickValue: 150, quantity: 0, 
      blockCost: 10000, blockCostMultiplier: 1.15, 
      toolIcon: '/sean/media/managers/pickaxe.png', 
      managerPurchased: false, managerEnabled: false, managerCost: 5000, 
      clickInterval: 9000, progress: 0, unlocked: false, animationIds: [] 
    },
    { 
      id: 'iron', name: 'Iron Ore', 
      icon: '/sean/media/blocks/iron.png', 
      clickValue: 900, quantity: 0, 
      blockCost: 100000, blockCostMultiplier: 1.15, 
      toolIcon: '/sean/media/managers/pickaxe.png', 
      managerPurchased: false, managerEnabled: false, managerCost: 20000, 
      clickInterval: 20000, progress: 0, unlocked: false, animationIds: [] 
    },
    { 
      id: 'diamond', name: 'Diamond Ore', 
      icon: '/sean/media/blocks/diamond.png', 
      clickValue: 6000, quantity: 0, 
      blockCost: 1000000, blockCostMultiplier: 1.15, 
      toolIcon: '/sean/media/managers/pickaxe.png', 
      managerPurchased: false, managerEnabled: false, managerCost: 100000, 
      clickInterval: 50000, progress: 0, unlocked: false, animationIds: [] 
    },
  ];

  // all the upgrades you can buy
  upgrades: Upgrade[] = [
    { 
      id: 'speed1', name: 'Efficiency I', 
      description: 'All managers work 40% faster', 
      cost: 5000, 
      effect: () => this.speedMultiplier *= 1.4, 
      purchased: false 
    },
    { 
      id: 'profit1', name: 'Fortune I', 
      description: 'All blocks produce 2.5x more', 
      cost: 10000, 
      effect: () => this.profitMultiplier *= 2.5, 
      purchased: false 
    },
    { 
      id: 'profit2', name: 'Fortune II', 
      description: 'All blocks produce 4x more', 
      cost: 50000, 
      effect: () => this.profitMultiplier *= 4, 
      purchased: false 
    },
    { 
      id: 'looting', name: 'Looting', 
      description: 'Clicking blocks gives 8x profit', 
      cost: 20000, 
      effect: () => this.clickProfitMultiplier *= 8, 
      purchased: false 
    },
    { 
      id: 'speed2', name: 'Efficiency II', 
      description: 'All managers work 80% faster', 
      cost: 100000, 
      effect: () => this.speedMultiplier *= 1.8, 
      purchased: false 
    },
  ];

  // runs once when the game starts
  ngOnInit(): void {
    this.updateAvailableUpgrades();
    this.updateBlocksPerSecond();
    this.progressInterval = setInterval(() => this.updateProgress(), 50);
    this.checkUnlocks();
  }

  // runs when the game closes, cleans up timers
  ngOnDestroy(): void {
    if (this.progressInterval) clearInterval(this.progressInterval);
  }

  // main game loop, runs every 50ms to update progress bars and make money
  updateProgress(): void {
    let totalProduction = 0;

    // check each block's manager
    this.blocksData.forEach((block) => {
      // only process blocks that have managers on and you own at least 1
      if (block.managerPurchased && block.managerEnabled && block.quantity > 0) {
        // figure out how fast this manager works with speed upgrades
        const effectiveInterval = block.clickInterval / this.speedMultiplier;
        
        // update the progress bar
        const oldProgress = block.progress;
        block.progress = Math.min(100, block.progress + (50 / effectiveInterval) * 100);
        
        // if progress hit 100%, make money and reset
        if (oldProgress < 100 && block.progress >= 100) {
          // figure out how much money this block makes
          const production = block.clickValue * block.quantity * this.profitMultiplier;
          totalProduction += production;
          
          // reset progress bar
          block.progress = 0;
          
          // start a rising block animation
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
        // reset progress if manager is off
        block.progress = 0;
      }
    });

    // add all the money made this frame
    if (totalProduction > 0) {
      this.dirtBlocks += totalProduction;
      this.updateBlocksPerSecond();
      this.checkUnlocks();
      this.cdr.detectChanges(); // tell Angular to update the screen
    }
  }

  // figure out how much money you make per second, shown in the header
  updateBlocksPerSecond(): void {
    this.blocksPerSecond = 0;
    
    this.blocksData.forEach((block) => {
      if (block.managerPurchased && block.managerEnabled && block.quantity > 0) {
        // figure out clicks per second for this block
        const effectiveInterval = block.clickInterval / this.speedMultiplier;
        const clicksPerSecond = (1000 / effectiveInterval) * block.quantity;
        
        // add this block's production to the total
        this.blocksPerSecond += block.clickValue * clicksPerSecond * this.profitMultiplier;
      }
    });
  }

  // check if you have enough money to unlock new blocks
  checkUnlocks(): void {
    if (this.dirtBlocks >= 100 && !this.blocksData[1].unlocked) {
      this.blocksData[1].unlocked = true;
      this.blocksData[1].quantity = 1; // give you 1 free block when you unlock
    }
    if (this.dirtBlocks >= 1000 && !this.blocksData[2].unlocked) {
      this.blocksData[2].unlocked = true;
      this.blocksData[2].quantity = 1;
    }
    if (this.dirtBlocks >= 10000 && !this.blocksData[3].unlocked) {
      this.blocksData[3].unlocked = true;
      this.blocksData[3].quantity = 1;
    }
    if (this.dirtBlocks >= 100000 && !this.blocksData[4].unlocked) {
      this.blocksData[4].unlocked = true;
      this.blocksData[4].quantity = 1;
    }
    if (this.dirtBlocks >= 1000000 && !this.blocksData[5].unlocked) {
      this.blocksData[5].unlocked = true;
      this.blocksData[5].quantity = 1;
    }
  }

  // when you click on a block yourself
  clickBlock(block: Block): void {
    if (block.unlocked && block.quantity > 0) {
      // figure out money earned: base value times quantity times multipliers
      const earnings = block.clickValue * block.quantity * this.profitMultiplier * this.clickProfitMultiplier;
      this.dirtBlocks += earnings;
      this.checkUnlocks();
    }
  }

  // figure out the cost of one block with cost reduction upgrades
  getBlockCost(block: Block): number {
    return Math.max(1, Math.floor(block.blockCost * (1 - this.costReduction)));
  }

  // figure out how many blocks you can afford to buy
  getMaxAffordable(block: Block): number {
    if (!block.unlocked) return 0;
    
    let max = 0;
    let cost = this.getBlockCost(block);
    let totalCost = 0;
    
    // keep buying blocks until you run out of money
    while (totalCost + cost <= this.dirtBlocks) {
      totalCost += cost;
      max++;
      // each block costs more than the last
      cost = Math.floor(cost * block.blockCostMultiplier * (1 - this.costReduction));
    }
    
    return max;
  }

  // buy as many blocks as you can afford
  buyBlocks(block: Block): void {
    if (!block.unlocked) return;
    
    const maxAffordable = this.getMaxAffordable(block);
    if (maxAffordable === 0) return;
    
    // figure out the total cost
    let totalCost = 0;
    let cost = this.getBlockCost(block);
    let quantityToBuy = 0;
    
    for (let i = 0; i < maxAffordable && totalCost + cost <= this.dirtBlocks; i++) {
      totalCost += cost;
      quantityToBuy++;
      cost = Math.floor(cost * block.blockCostMultiplier * (1 - this.costReduction));
    }
    
    // actually buy the blocks
    if (totalCost <= this.dirtBlocks && quantityToBuy > 0) {
      this.dirtBlocks -= totalCost;
      block.quantity += quantityToBuy;
      block.blockCost = cost / (1 - this.costReduction || 1);
      this.updateBlocksPerSecond();
      this.checkUnlocks();
    }
  }

  // buy a manager (auto clicker) for a block
  buyManager(block: Block): void {
    if (!block.unlocked || block.managerPurchased || this.dirtBlocks < block.managerCost) return;
    
    this.dirtBlocks -= block.managerCost;
    block.managerPurchased = true;
    block.managerEnabled = true; // turn it on automatically when you buy it
    this.updateBlocksPerSecond();
  }

  // turn a manager on or off
  toggleManager(block: Block): void {
    if (block.managerPurchased) {
      block.managerEnabled = !block.managerEnabled;
      block.progress = 0; // reset progress bar
      block.animationIds = []; // clear any animations
      this.updateBlocksPerSecond();
    }
  }

  // buy an upgrade
  purchaseUpgrade(upgrade: Upgrade): void {
    if (upgrade.purchased || this.dirtBlocks < upgrade.cost) return;
    
    this.dirtBlocks -= upgrade.cost;
    upgrade.purchased = true;
    upgrade.effect(); // run the upgrade's effect function
    this.updateAvailableUpgrades();
  }

  // figure out how much money per second a block's manager makes
  getProductionRate(block: Block): number {
    if (!block.managerPurchased || !block.managerEnabled || block.quantity === 0) return 0;
    
    const effectiveInterval = block.clickInterval / this.speedMultiplier;
    const clicksPerSecond = (1000 / effectiveInterval) * block.quantity;
    return block.clickValue * clicksPerSecond * this.profitMultiplier;
  }

  // check if you can afford something
  canAfford(cost: number): boolean {
    return this.dirtBlocks >= cost;
  }

  // get the text for the buy button like "Buy 5x dirt blocks"
  getBuyButtonText(block: Block): string {
    if (!block.unlocked) return 'Locked';
    
    const max = this.getMaxAffordable(block);
    return `Buy ${max}x ${block.name.toLowerCase()}${max !== 1 ? 's' : ''}`;
  }

  // update the list of upgrades you can still buy
  updateAvailableUpgrades(): void {
    this.availableUpgrades = this.upgrades.filter(upgrade => !upgrade.purchased);
  }
}
