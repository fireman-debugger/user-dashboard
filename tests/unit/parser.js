import { parse } from 'json5';

const parseJson = (data) => {
  try {
    return parse(data);
  } catch (error) {
    return { error: 'Invalid JSON' };
  }
};

export default parseJson;