import { WasteDatabase } from '../types/waste';

export const wasteDatabase: WasteDatabase = {
  categories: [
    {
      items: [
        'plastic bottle', 'water bottle', 'soda bottle', 'plastic container',
        'milk jug', 'detergent bottle', 'shampoo bottle', 'conditioner bottle',
        'yogurt container', 'plastic cup', 'plastic bag'
      ],
      binType: 'recycle',
      description: 'Clean plastic containers can be recycled in most recycling programs.',
      tips: [
        'Rinse containers before recycling to remove food residue.',
        'Remove caps and lids before recycling.',
        'Check the recycling number on the bottom to ensure it is accepted in your area.'
      ],
      facts: [
        'Plastic takes up to 1,000 years to decompose in landfills.',
        'Only about 9% of all plastic ever made has been recycled.',
        'Recycling one ton of plastic saves the equivalent of 1,000–2,000 gallons of gasoline.'
      ]
    },
    {
      items: [
        'paper', 'newspaper', 'magazine', 'cardboard', 'cereal box', 
        'office paper', 'envelope', 'mail', 'paper bag', 'egg carton',
        'book', 'notebook', 'pamphlet', 'flyer', 'brochure'
      ],
      binType: 'recycle',
      description: 'Paper products are highly recyclable and should be kept separate from food waste.',
      tips: [
        'Remove any plastic windows or linings before recycling paper.',
        'Flatten cardboard boxes to save space in your recycling bin.',
        'Shredded paper can often be recycled but may need to be placed in a paper bag.'
      ],
      facts: [
        'Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and 380 gallons of oil.',
        'The average American uses about 680 pounds of paper each year.',
        'Making recycled paper uses 64% less energy than making paper from virgin wood pulp.'
      ]
    },
    {
      items: [
        'apple core', 'banana peel', 'orange peel', 'fruit', 'vegetable', 
        'coffee grounds', 'tea bag', 'eggshell', 'nut shell', 'grass clippings',
        'leaves', 'yard waste', 'food scraps', 'garden waste', 'plant trimmings'
      ],
      binType: 'compost',
      description: 'Food scraps and yard waste can be composted to create nutrient-rich soil.',
      tips: [
        'Avoid composting meat, dairy, and oily foods as they can attract pests.',
        'Balance "green" materials (food scraps) with "brown" materials (leaves, paper).',
        'Chop larger items into smaller pieces to speed up the composting process.'
      ],
      facts: [
        'About 30% of what we throw away could be composted instead of sent to landfills.',
        'Composting reduces methane emissions from landfills and enriches soil.',
        'A well-maintained compost pile can reach internal temperatures of 140-160°F.'
      ]
    },
    {
      items: [
        'battery', 'electronics', 'phone', 'computer', 'laptop', 
        'tablet', 'tv', 'monitor', 'printer', 'keyboard',
        'mouse', 'charger', 'cable', 'light bulb', 'led', 'cfl'
      ],
      binType: 'trash',
      description: 'Electronic waste contains hazardous materials and should be taken to special e-waste recycling centers.',
      tips: [
        'Many electronics stores offer take-back programs for old devices.',
        'Delete personal data before disposing of electronic devices.',
        'Check with your local waste management authority for e-waste collection events.'
      ],
      facts: [
        'E-waste represents 2% of America\'s trash in landfills, but 70% of overall toxic waste.',
        'Only 12.5% of e-waste is currently recycled worldwide.',
        'One metric ton of circuit boards can contain 40-800 times the amount of gold in one metric ton of ore.'
      ]
    },
    {
      items: [
        'styrofoam', 'foam', 'plastic utensils', 'plastic cutlery', 'plastic straw', 
        'chip bag', 'candy wrapper', 'snack wrapper', 'disposable diaper', 'cigarette butt',
        'broken glass', 'ceramic', 'light bulb', 'bubble wrap', 'packing peanuts'
      ],
      binType: 'trash',
      description: 'These items typically cannot be recycled in standard programs and should go in the trash.',
      tips: [
        'Try to reduce your use of single-use items that end up in landfills.',
        'Some specialty recycling programs may accept items like styrofoam - check locally.',
        'Consider buying products with less packaging or recyclable packaging.'
      ],
      facts: [
        'The average American generates about 4.9 pounds of waste per day.',
        'Styrofoam can take up to 500 years to decompose in landfills.',
        'Over 500 million plastic straws are used daily in the US alone.'
      ]
    }
  ]
};