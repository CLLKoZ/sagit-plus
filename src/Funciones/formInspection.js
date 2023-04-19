const DOMAIN = `http://168.232.50.15`;
const PORT = "80";
const BASE_URL = "v1";

export const getFilledForm = (inspection, form) => {
  const formInspection = form;
  const inspectionFull = inspection.inspectionFull[0]

  let filledForm = {
    name: formInspection.name,
    sections: []
  }

  formInspection.sections.forEach((section, sectionIndex) => {
    const sectionFields = section.items.reduce((acumulator, currentItem) => {
      if(!currentItem.fields) return acumulator;

      let fields = [];

      if (currentItem.multiple){
        const values = inspectionFull[`s${sectionIndex}`][currentItem.groupName];
        
        values.forEach((value, index) => {
          Object.keys(value).forEach((key) => {
            currentItem.fields.forEach((field, index3) => {
              if (key !== field.name) return;

              let newField = JSON.parse(JSON.stringify(field));
              newField.name += `${index + 1}`;
              newField.options.webLabel += ` ${index + 1}`;
              newField.icon = currentItem.icon;
              newField.value = value[key];

              if (newField.type === "imageFS") {
                newField.imageURI = `${DOMAIN}:${PORT}/${BASE_URL}`
                  + `/inspection/photo/find/${newField.value}`
              }

              fields = [ ...fields, newField ];
            });
          });

          if (index === values.length - 1) {
            for (let i = index + 1; i < currentItem.limit; i++) {
              // eslint-disable-next-line
              currentItem.fields.forEach((field) => {
                let newField = JSON.parse(JSON.stringify(field));
                newField.name += ` ${i + 1}`;
                newField.options.webLabel += ` ${i + 1}`;
                newField.icon = currentItem.icon;
                newField.value = "";
                
                fields = [ ...fields, newField ];
              });
            }
          }
        })

        return [ ...acumulator, ...fields ]
      }

      currentItem.fields.forEach(field => {
        let value = undefined;
        if(currentItem.groupName === field.name) {
          value = inspectionFull[`s${sectionIndex}`][field.name];
        } else {
          try {
            value = inspectionFull[`s${sectionIndex}`][currentItem.groupName][field.name];
          } catch {
            value = null
          }
        }

        if (field.type === 'imageFS') {
          field.imageURI = `${DOMAIN}:${PORT}/${BASE_URL}`
            + `/inspection/photo/find/${value}`
        }

        fields = [
          ...fields,
          {
            ...field,
            icon: currentItem.icon,
            value
          }
        ]
      })

      return [ ...acumulator, ...fields]
    }, []);

    filledForm.sections.push({
      name: section.sectionName,
      fields: sectionFields
    })
  });

  return filledForm;
};

export const getFieldValue = (field) => {
  if (field.value === "") return field.value;

  switch (field.type) {
    case "select":
      // Returns the label
      return field.options.items
        .find(item => item.value === field.value)
        .label

    case "multiCheckFS":
    case "imageMultiCheckFS":
      // Returns the labels separated with commas (,)
      return field.value.map(element => (
        field.options.items
          .find(item => item.value === element)
          .label
      ))

    case "imageFS":
      // Returns the value of the image according to the format received
      // When multiple images, only returns one
      if (!Array.isArray(field.value)) return field.value;

      return field.value.reduce((accumulator, currentItem) => {
        if (currentItem === "") return accumulator;
        return [...accumulator, ...Object.values(currentItem)]
      }, "")[0];

    default:
      return field.value;
  }
};