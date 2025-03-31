import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { countryDtos } from '../../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../../core/countries/types';
import sizes from '../../../../core/themes/sizes';
import { useTheme } from '../../../../core/themes/themeContext';
import { useDebounce } from '../../../../utils/hooks/useDebounce';
import Text from '../../../atoms/Text';
import TextInput from '../../../atoms/TextInput';
import CheckIcon2 from '../../../icons/CheckIcon2';
import { countryFlags } from '../../../icons/Flags';
import FlatListWithCustomScroll from '../../FlatListWithCustomScroll';
import { type PhoneSelectProps } from './props';

const itemHeight = 50;

const PhoneSelect = ({ flagState, onFlagSelect, hidePanel }: PhoneSelectProps): JSX.Element => {
  const { colors } = useTheme();

  const [filteredCountryDtos, setFilteredCountryDtos] = useState<CountryPhoneMaskDto[]>(countryDtos);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const trimmedText = debouncedValue.trim().toLowerCase();
    setFilteredCountryDtos(
      countryDtos.filter(
        element => element.countryName.toLowerCase().includes(trimmedText) || element.icc.includes(trimmedText),
      ),
    );
  }, [debouncedValue]);

  const handleFlagSelect = (flag: CountryPhoneMaskDto) => {
    onFlagSelect(flag);
    hidePanel();
  };

  const getItemLayout = (data: ArrayLike<CountryPhoneMaskDto> | null | undefined, index: number) => {
    if (data) {
      return {
        length: itemHeight,
        offset: itemHeight * index,
        index,
      };
    }
    return {
      length: 0,
      offset: 0,
      index,
    };
  };

  const computedStyles = StyleSheet.create({
    listItemCountryName: {
      color: colors.textSecondaryColor,
    },
    listContentContainer: {
      paddingBottom: sizes.paddingVertical / 2,
    },
  });

  const renderItem = ({ item }: { item: CountryPhoneMaskDto }) => (
    <Pressable
      style={styles.listItemContainer}
      onPress={() => {
        handleFlagSelect(item);
      }}
    >
      <View style={styles.listItemFlagContainer}>{countryFlags[item.countryCode]}</View>
      <Text style={styles.listItemIcc}>{item.icc}</Text>
      <Text style={[styles.listItemCountryName, computedStyles.listItemCountryName]}>{item.countryName}</Text>
      {item.countryCode === flagState.countryCode && <CheckIcon2 />}
    </Pressable>
  );

  return (
    <>
      <TextInput
        wrapperStyle={styles.textInputSearchWrapper}
        value={inputValue}
        withClearButton={true}
        onChangeText={setInputValue}
      />
      <FlatListWithCustomScroll
        renderItem={renderItem}
        items={filteredCountryDtos}
        getItemLayout={getItemLayout}
        windowSize={10}
        initialNumToRender={15}
        keyExtractor={item => item.countryCode}
        contentContainerStyle={computedStyles.listContentContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInputSearchWrapper: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  listItemFlagContainer: {
    width: 41,
    marginRight: 8,
    marginLeft: 16,
    height: 50,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    fontFamily: 'Inter Medium',
  },
  listItemIcc: {
    width: 70,
    lineHeight: 19,
  },
  listItemCountryName: {
    flex: 1,
    lineHeight: 19,
    letterSpacing: 0.64,
  },
});

export default PhoneSelect;
