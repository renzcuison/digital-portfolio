import { COMPANIONS } from "./companions";

export const CRITICAL_ASSETS = [
    "/Omdr4O7xSkx4qbQ.png",
    "/GVRVPa7OeVSoBRQ.png",
    "/FaZULvjS2HOsp2E.png",
    "/0XI2FNdaGeVz7xp.png",
    ...COMPANIONS.map((c) => c.path),
];

export const LOADING_CIRCLE_CIRCUMFERENCE = 314.159;

export const GUN_SETTINGS = {
    FIRE_RATE: 110,
    HEAT_INC: 5,
    COOL_NORMAL: 0.8,
    COOL_OVERHEAT: 1.5,
    MAX_VISIBLE_HOLES: 12,
    HOLE_STAY_TIME: 1000,
    RECOIL_FORCE: -14,
    RECOIL_STIFFNESS: 1000,
    RECOIL_DAMPING: 20,
    PEW_SCATTER_RANGE: 40,
};

export const INTERACTIVE_ELEMENTS = [
    'button', 'a', 'input', 'textarea', 'select', '[role="button"]',
].join(',');