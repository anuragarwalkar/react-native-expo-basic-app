import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationComponent } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import CustomMenu from '../../components/UI/CustomMenu';
import { OPEN_SANS_BOLD } from '../../constants/Fonts';
import Product from '../../models/Product.class';
import { createProduct, updateProduct } from '../../store/actions/product.actions';
import RootState from '../../store/rootState.model';
import { formData, FormData, FormDataItem } from './formData';

const convertObjectToArray = (formValues: FormData): FormDataItem[] =>
  Object.values(formValues).sort((a, b) => (a.id < b.id ? -1 : 1));

const EditProduct: NavigationComponent<{}, {}> = (props: NavigationStackScreenProps) => {
  const productId = props.navigation.getParam('productId');
  const dispatch = useDispatch();
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
    setFormValues((oldFormValues: FormData) => {
      return {
        ...oldFormValues,
        [property]: {
          ...oldFormValues[property],
          value,
        },
      };
    });
  };

  const submitHandler = useCallback(() => {
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
          <View key={item.id}>
            <View style={styles.formControl}>
              <Text style={styles.title}>{item.title}</Text>
              <TextInput
                style={styles.textInput}
                value={item.value}
                onChangeText={(text) => onSetTextValue(text, item.alise)}
              />
            </View>
          </View>
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
