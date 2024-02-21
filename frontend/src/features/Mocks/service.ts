import { AnyData, useInstanceDefaults } from 'feathers-pinia';

export default {
  setupInstance: (data: AnyData): AnyData => (
    useInstanceDefaults({}, data)
  ),
};
