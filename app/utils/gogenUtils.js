/* eslint-disable no-unused-expressions */
export default function transformEligibilityOptions(state) {
  const jsonObject = { dismiss: [], reduce: [] };
  Object.values(state).forEach(value => {
    value.option === 'dismiss'
      ? jsonObject.dismiss.push(value.codeSection.toUpperCase())
      : jsonObject.reduce.push(value.codeSection.toUpperCase());
  });
  return jsonObject;
}
