export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "points",
        type: "uint256",
      },
    ],
    name: "PointsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardId",
        type: "uint256",
      },
    ],
    name: "RewardClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "points",
        type: "uint256",
      },
    ],
    name: "addPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pointCost",
        type: "uint256",
      },
    ],
    name: "addReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rewardId",
        type: "uint256",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyProfile",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "fullname",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "string",
            name: "phone",
            type: "string",
          },
          {
            internalType: "string",
            name: "addressDetail",
            type: "string",
          },
          {
            internalType: "string",
            name: "religion",
            type: "string",
          },
          {
            internalType: "string",
            name: "dateOfBirth",
            type: "string",
          },
          {
            internalType: "string",
            name: "sex",
            type: "string",
          },
          {
            internalType: "string",
            name: "passportCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "passportExpiry",
            type: "string",
          },
          {
            internalType: "string",
            name: "nationality",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "scholarPoint",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "maritalStatus",
            type: "string",
          },
          {
            internalType: "string",
            name: "familyInfo",
            type: "string",
          },
          {
            internalType: "string",
            name: "budgetInfo",
            type: "string",
          },
          {
            internalType: "string",
            name: "roadmap",
            type: "string",
          },
        ],
        internalType: "struct ScholarProfileManager.Profile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rewards",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pointCost",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fullname",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "string",
        name: "phone",
        type: "string",
      },
      {
        internalType: "string",
        name: "addressDetail",
        type: "string",
      },
      {
        internalType: "string",
        name: "religion",
        type: "string",
      },
      {
        internalType: "string",
        name: "dateOfBirth",
        type: "string",
      },
      {
        internalType: "string",
        name: "sex",
        type: "string",
      },
    ],
    name: "setBasicInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "scholarPoint",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "maritalStatus",
        type: "string",
      },
      {
        internalType: "string",
        name: "familyInfo",
        type: "string",
      },
      {
        internalType: "string",
        name: "budgetInfo",
        type: "string",
      },
      {
        internalType: "string",
        name: "roadmap",
        type: "string",
      },
    ],
    name: "setOtherInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "passportCode",
        type: "string",
      },
      {
        internalType: "string",
        name: "passportExpiry",
        type: "string",
      },
      {
        internalType: "string",
        name: "nationality",
        type: "string",
      },
    ],
    name: "setPassportInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
