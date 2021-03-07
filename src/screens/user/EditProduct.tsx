import React, { useCallback, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import CustomMenu from '../../components/UI/CustomMenu';
import { OPEN_SANS, OPEN_SANS_BOLD } from '../../constants/Fonts';
import Product from '../../models/Product.class';
import { createProduct, updateProduct } from '../../store/actions/product.actions';
import RootState from '../../store/rootState.model';
import { formData, FormData, FormDataItem } from './formData';

const convertObjectToArray = (formValues: FormData): FormDataItem[] =>
  Object.values(formValues).sort((a, b) => (a.id < b.id ? -1 : 1));

const EditProduct: NavigationStackScreenComponent = (props) => {
  const productId = props.navigation.getParam('productId');
  const dispatch = useDispatch();
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const products: Product[] = useSelector((rootState: RootState) => rootState.products.userProducts);
  let product: Product;
  const isEditScreen = productId !== undefined;
  let formDataInitialState = formData;

  if (isEditScreen) {
    [product] = products.filter(({ id }) => id === productId);

    for (let key in formDataInitialState) {
      const value = product[key as keyof Product];
      formDataInitialState[key].value = typeof value === 'number' ? value.toString() : value;
    }
  }

  const [formValues, setFormValues] = useState({ ...formDataInitialState });

  const formControls = convertObjectToArray(formValues);

  const onSetTextValue = (value: string, property: string) => {
    const isValid = value.trim().length > 0;
    const touched = true;

    const setText = (oldFormValues: FormData) => {
      return {
        ...oldFormValues,
        [property]: {
          ...oldFormValues[property],
          value,
          isValid,
          touched,
        },
      };
    };

    setFormValues(setText);
  };

  const isAllFormInvalid = () => {
    let isInvalid = false;
    for (let control in formValues) {
      if (!formValues[control].isValid) {
        isInvalid = true;
        break;
      }
    }
    setIsFormInvalid(isInvalid);
    return isInvalid;
  };

  const validateInput = (property: string) => {
    const setText = (oldFormValues: FormData) => {
      return {
        ...oldFormValues,
        [property]: {
          ...oldFormValues[property],
          touched: true,
        },
      };
    };

    setFormValues(setText);
  };

  const submitHandler = useCallback(() => {
    if (isAllFormInvalid()) {
      Alert.alert('Wrong input!', 'Please check the Error message', [{ text: 'ok' }]);
      return;
    }
    const { title, description, price, imageUrl }: FormData = formValues;

    const newProduct = new Product(
      productId ? productId : new Date().toString(),
      'u1',
      title.value,
      imageUrl.value,
      description.value,
      parseInt(price.value)
    );

    if (!isEditScreen) {
      dispatch(createProduct(newProduct));
    } else {
      dispatch(updateProduct(productId, newProduct));
    }

    props.navigation.goBack();
    setFormValues(formDataInitialState);
  }, [formValues]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        {formControls.map((item: FormDataItem) => (
          <KeyboardAvoidingView key={item.id} style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
            <View style={styles.formControl}>
              <Text style={styles.title}>{item.title}</Text>
              <TextInput
                style={styles.textInput}
                value={item.value}
                keyboardType={item.keyboradType}
                onChangeText={(text) => onSetTextValue(text, item.alise)}
                autoCapitalize="sentences"
                autoCorrect
                onBlur={() => validateInput(item.alise)}
              />
              {((item.touched && !item.isValid) || (isFormInvalid && !item.isValid)) && (
                <Text style={styles.errorText}>{`Please enter a valid ${item.title} !`}</Text>
              )}
            </View>
          </KeyboardAvoidingView>
        ))}
      </View>
    </ScrollView>
  );
};

EditProduct.navigationOptions = (navData: NavigationStackScreenProps) => {
  const productId = navData.navigation.getParam('productId');
  const submit = navData.navigation.getParam('submit');

  const title = productId ? 'Edit' : 'New';
  return {
    headerTitle: `${title} Product`,
    headerRight: () => <CustomMenu title="Checkmark" icon="checkmark" onPress={submit} />,
  };
};

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorText: { color: 'red', fontFamily: OPEN_SANS, paddingTop: 5, paddingHorizontal: 5 },
  title: {
    fontFamily: OPEN_SANS_BOLD,
    marginVertical: 8,
  },
  formControl: {
    width: '100%',
  },
  form: {
    margin: 20,
  },
});

export default EditProduct;
