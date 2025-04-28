import { useEffect, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { beautyTheme } from '@theme';
import i18next from 'i18next';
import { Text } from 'react-native-paper';

import Input from '../TextInputWithCounter/index';

type SearchWithListProps<T extends { id: string | number }> = {
  label: string;
  placeholder?: string;
  searchValue: string;
  list: T[];
  handleInputChange: (value: string) => void;
  showOnList: (item: T) => void;
  onSelect: (item: T) => void;
};

const SearchWithList = <T extends { id: string | number }>({
  label,
  placeholder = i18next.t('form.typeToSearch'),
  searchValue,
  list,
  handleInputChange,
  onSelect,
  showOnList = (v) => v.toString(),
}: SearchWithListProps<T>) => {
  const [choice, setChoice] = useState<T | null>(null);

  const isListVisible = searchValue.length > 0 && list.length > 0 && !choice;

  const itemPressHandler = (item: T): void => {
    setChoice(item);
    onSelect(item);
  };

  // Reset choice when search value changes and it's empty
  useEffect(() => {
    if (searchValue.length === 0) {
      setChoice(null);
    }
  }, [searchValue]);

  return (
    <View style={styles.searchListWrapper}>
      <Input
        value={searchValue}
        onChangeText={handleInputChange}
        label={label}
        onFocus={() => setChoice(null)}
        placeholder={placeholder}
      />
      {isListVisible && (
        <View style={styles.suggestionsContainer}>
          {list.map((item, index) => (
            <TouchableOpacity
              key={item.id.toString()}
              onPress={() => itemPressHandler(item)}
              style={[
                styles.element,
                index !== list.length - 1 && styles.elementWithBorder,
              ]}
            >
              <Text>{showOnList(item) ?? ''}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchWithList;

const styles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: beautyTheme.roundness,
    padding: beautyTheme.spacing.m,
    position: 'absolute',
    width: '100%',
    elevation: 3,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    top: 55,
  },
  searchListWrapper: {
    position: 'relative',
  },
  element: {
    padding: beautyTheme.spacing.m,
  },
  elementWithBorder: {
    borderBottomColor: beautyTheme.colors.outlineVariant,
    borderBottomWidth: 1,
  },
});
