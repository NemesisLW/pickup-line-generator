const basepromptInstructions =
  "The user will provide you with the description of their crush and the style of the pickup lines they are looking for. Based on the those information, generate a survey object with 1 field: a pickup lines array of two elements, where every element has 2 fields: 'id' and 'text' and return it in json format.";

const promptInstructions =
  "The user will provide you with: \
  1. A description of their crush. \
  2. The style or theme of the pickup lines they are looking for. \
  Based on this information, generate a survey object with the following structure: \
  - A pickup lines array of two elements, where each element is an object with two fields: 'id' and 'text'. \
  - The 'text' field should contain a pickup line that is tailored to both the description of the crush and the specified style or theme. \
  Return the survey object in JSON format.";

const promptInstructionswithExample =
  'The user will provide you with: \
  1. A description of their crush. \
  2. The style or theme of the pickup lines they are looking for. \
  Based on this information, generate a survey object with the following structure: \
  - A pickup lines array of two elements, where each element is an object with two fields: \'id\' and \'text\'. \
  - The \'text\' field should contain a pickup line that is tailored to both the description of the crush and the specified style or theme. \
  Return the survey object in JSON format. \
  \
  For example: \
  - Description of crush: "A book lover with a great sense of humor." \
  - Style of pickup lines: "Witty and intellectual." \
  \
  Output: \
  { \
      "pickupLines": [ \
          { "id": 1, "text": "Are you a library book? Because you’ve got \'fine\' written all over you." }, \
          { "id": 2, "text": "If you were a book, I\'d never put you down." } \
      ] \
  }';

const experimentPrompt =
  "The user will provide you with: \
  1. A description of their crush. \
  2. The style or theme of the pickup lines they are looking for. \
  Based on this information, Format the output as a JSON object with a key 'pickupLines' containing a list of the two pickup lines.\
  - The pickup lines should be tailored to both the description of the crush and the specified style or theme. Be Creative! \
  Return the object in JSON format.";

export {
  basepromptInstructions,
  promptInstructions,
  promptInstructionswithExample,
  experimentPrompt,
};
