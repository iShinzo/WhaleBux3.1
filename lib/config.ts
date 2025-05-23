// Level configuration
export interface LevelConfig {
  xpMin: number
  xpMax: number
  miningDuration: number // in hours
  baseRate: number // base mining rate per hour
  miningEarnings: number // total earnings for full mining duration
  boost: number // base boost percentage
}

export interface MiningRateUpgrade {
  level: number
  bonus: number // Additional WBUX per hour
  cost: number // Cost in WBUX $Dollars
  tokenCost: number // Cost in WBUX tokens
}

export interface MiningBoostUpgrade {
  level: number
  bonus: number // Additional percentage boost
  cost: number // Cost in WBUX $Dollars
  tokenCost: number // Cost in WBUX tokens
}

export interface MiningTimeUpgrade {
  level: number
  bonus: number // Minutes reduced from mining time
  cost: number // Cost in WBUX $Dollars
  tokenCost: number // Cost in WBUX tokens
}

// Base level configurations
export const LEVEL_CONFIG: Record<number, LevelConfig> = {
  1: {
    xpMin: 0,
    xpMax: 10,
    miningDuration: 2,
    baseRate: 1.0,
    miningEarnings: 2.0,
    boost: 0,
  },
  2: {
    xpMin: 11,
    xpMax: 100,
    miningDuration: 3,
    baseRate: 2.1,
    miningEarnings: 6.3,
    boost: 7,
  },
  3: {
    xpMin: 101,
    xpMax: 1000,
    miningDuration: 4,
    baseRate: 3.21,
    miningEarnings: 12.84,
    boost: 15,
  },
  4: {
    xpMin: 1001,
    xpMax: 10000,
    miningDuration: 5,
    baseRate: 4.4,
    miningEarnings: 22.0,
    boost: 23,
  },
  5: {
    xpMin: 10001,
    xpMax: 100000,
    miningDuration: 6,
    baseRate: 5.6,
    miningEarnings: 33.6,
    boost: 38,
  },
  6: {
    xpMin: 100001,
    xpMax: 500000,
    miningDuration: 7,
    baseRate: 6.9,
    miningEarnings: 48.3,
    boost: 50,
  },
  7: {
    xpMin: 500001,
    xpMax: 1000000,
    miningDuration: 8,
    baseRate: 8.26,
    miningEarnings: 66.08,
    boost: 76,
  },
  8: {
    xpMin: 1000001,
    xpMax: 5000000,
    miningDuration: 9,
    baseRate: 9.6,
    miningEarnings: 86.4,
    boost: 90,
  },
  9: {
    xpMin: 5000001,
    xpMax: Number.POSITIVE_INFINITY,
    miningDuration: 10,
    baseRate: 11.25,
    miningEarnings: 112.5,
    boost: 150,
  },
}

// Mining Rate upgrade configurations
export const MINING_RATE_UPGRADES: MiningRateUpgrade[] = [
  { level: 1, bonus: 1, cost: 10, tokenCost: 0 },
  { level: 2, bonus: 1, cost: 110, tokenCost: 0 },
  { level: 3, bonus: 1, cost: 500, tokenCost: 0 },
  { level: 4, bonus: 1, cost: 1200, tokenCost: 0 },
  { level: 5, bonus: 1, cost: 2800, tokenCost: 0 },
  { level: 6, bonus: 2, cost: 0, tokenCost: 5 },
  { level: 7, bonus: 2, cost: 0, tokenCost: 10 },
  { level: 8, bonus: 2, cost: 0, tokenCost: 20 },
  { level: 9, bonus: 3, cost: 0, tokenCost: 25 },
]

// Mining Boost upgrade configurations
export const MINING_BOOST_UPGRADES: MiningBoostUpgrade[] = [
  { level: 1, bonus: 5, cost: 15, tokenCost: 0 },
  { level: 2, bonus: 10, cost: 130, tokenCost: 0 },
  { level: 3, bonus: 16, cost: 300, tokenCost: 0 },
  { level: 4, bonus: 28, cost: 1500, tokenCost: 0 },
  { level: 5, bonus: 39, cost: 2800, tokenCost: 0 },
  { level: 6, bonus: 53, cost: 0, tokenCost: 10 },
  { level: 7, bonus: 69, cost: 0, tokenCost: 30 },
  { level: 8, bonus: 80, cost: 0, tokenCost: 80 },
  { level: 9, bonus: 120, cost: 0, tokenCost: 120 },
]

// Mining Time upgrade configurations
export const MINING_TIME_UPGRADES: MiningTimeUpgrade[] = [
  { level: 1, bonus: 30, cost: 10, tokenCost: 0 },
  { level: 2, bonus: 30, cost: 150, tokenCost: 0 },
  { level: 3, bonus: 30, cost: 500, tokenCost: 0 },
  { level: 4, bonus: 30, cost: 1200, tokenCost: 0 },
  { level: 5, bonus: 30, cost: 2500, tokenCost: 0 },
  { level: 6, bonus: 30, cost: 0, tokenCost: 15 },
  { level: 7, bonus: 30, cost: 0, tokenCost: 30 },
  { level: 8, bonus: 30, cost: 0, tokenCost: 70 },
  { level: 9, bonus: 30, cost: 0, tokenCost: 125 },
]
