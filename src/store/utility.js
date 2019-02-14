// atualiza oldObject com updatedProperties, os 2 parametros são objetos
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
