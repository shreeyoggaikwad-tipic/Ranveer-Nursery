const Plants = [
    {
        "id": 1,
        "name": "Bamboo Palm / Areca Palm",
        "category": "Indoor Plant",
        "image": "BambooPalm/ArecaPalm",
        "description": "Bamboo Palm / Areca Palm (Dypsis lutescens) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 2,
        "name": "Lady Palm",
        "category": "Indoor Plant",
        "image": "LadyPalm",
        "description": "Lady Palm (Raphis excelsa) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 3,
        "name": "Rubber Plant",
        "category": "Indoor Plant",
        "image": "RubberPlant",
        "description": "Rubber Plant (Ficus elastica) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 4,
        "name": "Peace Lily",
        "category": "Indoor Plant",
        "image": "PeaceLily",
        "description": "Peace Lily (Spathiphyllum wallisii) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 5,
        "name": "Ficus A1 Gold",
        "category": "Indoor Plant",
        "image": "FicusA1Gold",
        "description": "Ficus A1 Gold (Ficus Alii) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 6,
        "name": "Spider Plant",
        "category": "Indoor Plant",
        "image": "SpiderPlant",
        "description": "Spider Plant (Chlorophytum comosum) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 7,
        "name": "Daisy Plant",
        "category": "Indoor Plant",
        "image": "DaisyPlant",
        "description": "Daisy Plant (Gerbera daisy) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 8,
        "name": "Money Plant",
        "category": "Indoor Plant",
        "image": "MoneyPlant",
        "description": "Money Plant (Epiremnum aureum) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 9,
        "name": "Kentia Palm",
        "category": "Indoor Plant",
        "image": "KentiaPalm",
        "description": "Kentia Palm (Howea forsteriana) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 10,
        "name": "Queensland Umbrella",
        "category": "Indoor Plant",
        "image": "QueenslandUmbrella",
        "description": "Queensland Umbrella (Schefflera actinophylla) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 11,
        "name": "Janet Craig",
        "category": "Indoor Plant",
        "image": "JanetCraig",
        "description": "Janet Craig (Dracaena deremensis) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 12,
        "name": "Boston Fern",
        "category": "Indoor Plant",
        "image": "BostonFern",
        "description": "Boston Fern (Nephrolepis exaltata) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 13,
        "name": "Snake Plant / Mother-in-law's Tongue",
        "category": "Indoor Plant",
        "image": "SnakePlant/Mother-in-law'sTongue",
        "description": "Snake Plant / Mother-in-law's Tongue (Sansevieria trifasciata) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 14,
        "name": "Aloe Vera",
        "category": "Indoor Plant",
        "image": "AloeVera",
        "description": "Aloe Vera (Aloe barbadensis) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 15,
        "name": "Chinese Evergreen",
        "category": "Indoor Plant",
        "image": "ChineseEvergreen",
        "description": "Chinese Evergreen (Aglaonema sp) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 16,
        "name": "Golden Pothos",
        "category": "Indoor Plant",
        "image": "GoldenPothos",
        "description": "Golden Pothos (Epipremnum aureum syn. Scindapsus aureus) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 17,
        "name": "Dragon Tree",
        "category": "Indoor Plant",
        "image": "DragonTree",
        "description": "Dragon Tree (Dracaena marginata) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 18,
        "name": "Philodendron",
        "category": "Indoor Plant",
        "image": "Philodendron",
        "description": "Philodendron (Philodendron (P. cordatum, P. scandens, P. selloum)) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 19,
        "name": "Mums",
        "category": "Indoor Plant",
        "image": "Mums",
        "description": "Mums (Chrysanthemum sp. / Chrysanthemum morifolium) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 20,
        "name": "Gerbera Daisy",
        "category": "Indoor Plant",
        "image": "GerberaDaisy",
        "description": "Gerbera Daisy (Gerbera sp. / Gerbera jamesonii) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 21,
        "name": "English Ivy",
        "category": "Indoor Plant",
        "image": "EnglishIvy",
        "description": "English Ivy (Hedera helix) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 22,
        "name": "Heart Leaf Philodendron",
        "category": "Indoor Plant",
        "image": "HeartLeafPhilodendron",
        "description": "Heart Leaf Philodendron (Philodendron oxycardium) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 23,
        "name": "Weeping Fig",
        "category": "Indoor Plant",
        "image": "WeepingFig",
        "description": "Weeping Fig (Ficus benjamina) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 24,
        "name": "Warneckii",
        "category": "Indoor Plant",
        "image": "Warneckii",
        "description": "Warneckii (Dracaena deremensis warneckei) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 25,
        "name": "Pygmy Date Palm",
        "category": "Indoor Plant",
        "image": "PygmyDatePalm",
        "description": "Pygmy Date Palm (Phoenix roebelenii) - A beautiful indoor plant with multiple health and air-purifying benefits."
    },
    {
        "id": 26,
        "name": "Corn Plant / Cornstalk Plant",
        "category": "Indoor Plant",
        "image": "CornPlant/CornstalkPlant",
        "description": "Corn Plant / Cornstalk Plant (Dracaena fragrans) - A beautiful indoor plant with multiple health and air-purifying benefits."
    }
]

export default Plants;