import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.goBack();
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function resetStack(name, params) {
  // if (navigationRef.isReady()) {
  // Perform navigation if the react navigation is ready to handle actions
  navigationRef.reset({
    index: 1,
    routes: [{name: name, params}],
  });
  // } else {
  // You can decide what to do if react navigation is not ready
  // You can ignore this, or add these actions to a queue you can call later
  // }
}
