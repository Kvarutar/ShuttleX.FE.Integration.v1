import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { countryDtos } from '../../../../core/countries/countryDtos';
import { type countryDtosProps } from '../../../../core/countries/props';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import Text from '../../../atoms/Text';
import TextInput from '../../../atoms/TextInput/v2';
import CheckIcon2 from '../../../icons/CheckIcon2';
import { countryFlags } from '../../../icons/Flags';
import SafeAreaView from '../../SafeAreaView';
import ScrollViewWithCustomScroll from '../../ScrollViewWithCustomScroll';
import { type ListItemProps, type PhoneSelectProps } from './props';

//TODO: Need add phone input with search by flag

const PhoneSelect = ({ flagState, onFlagSelect, hidePanel }: PhoneSelectProps): JSX.Element => {
  const { colors } = useTheme();
  const [filteredCountryDtos, setFilteredCountryDtos] = useState<countryDtosProps[]>(countryDtos);

  const computedStyles = StyleSheet.create({
    textInputSearch: {
      borderColor: colors.borderColor,
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.phoneHeader}>
        <TextInput
          onChangeText={text => {
            const filtered = countryDtos.filter(element => {
              const trimmedText = text.trim();
              return (
                element.countryName.indexOf(trimmedText) !== -1 || `+${String(element.icc)}`.indexOf(trimmedText) !== -1
              );
            });
            setFilteredCountryDtos(filtered);
          }}
          containerStyle={styles.textInputSearchContainer}
          style={[styles.textInputSearch, computedStyles.textInputSearch]}
        />
      </View>
      <ScrollViewWithCustomScroll style={[styles.flagListContainer]}>
        {filteredCountryDtos.map((item, index) => (
          <ListItem
            iconSvg={countryFlags[item.countryCode]}
            icc={item.icc}
            countryName={item.countryName}
            onPress={() => {
              onFlagSelect(item);
              hidePanel();
            }}
            key={index}
            withCheck={item === flagState}
          />
        ))}
      </ScrollViewWithCustomScroll>
    </SafeAreaView>
  );
};

const ListItem = ({ iconSvg, icc, countryName, style, onPress, withCheck }: ListItemProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    listItemIcc: {
      color: colors.textPrimaryColor,
    },
    listItemCountryName: {
      color: colors.textSecondaryColor,
    },
  });

  return (
    <Pressable style={[styles.listItemContainer, style]} onPress={onPress}>
      <View style={styles.listItemFlagContainer}>{iconSvg}</View>
      <Text style={[styles.listItemIcc, computedStyles.listItemIcc]}>{`+${icc}`}</Text>
      <Text style={[styles.listItemCountryName, computedStyles.listItemCountryName]}>{countryName}</Text>
      {withCheck && <CheckIcon2 color={colors.textSecondaryColor} style={styles.flagMargin} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  listItemFlagContainer: {
    width: 41,
    marginRight: 8,
    height: 50,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  listItemIcc: {
    width: 70,
    lineHeight: 19,
  },
  listItemCountryName: {
    flex: 1,
    lineHeight: 19,
  },
  textInputSearch: {
    height: 50,
  },
  flagListContainer: {
    marginTop: 20,
    marginLeft: 0,
    marginBottom: 0,
  },
  flagMargin: {
    marginRight: 30,
  },
  phoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  textInputSearchContainer: {
    flex: 1,
  },
});

export default PhoneSelect;
