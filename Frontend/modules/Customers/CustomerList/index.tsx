import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Animated, FlatList, StyleSheet, Text } from 'react-native';

import { ScreenWrapper } from '@components';
import { apiRoutes } from '@helpers';
import { RefetchOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { beautyTheme } from '@theme';
import { CustomerType } from '@types';
import NoData from 'components/NoData';
import { useTranslation } from 'react-i18next';
import { Searchbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomerDetailListRow from '../CustomerDetailListRow';
import CustomerForm from '../CustomerForm';
import { styles } from './style';

type CustomerListType = {
  clients: CustomerType[];
  isSearchbarVisible: boolean;
  onSearchbarClose: () => void;
  isAddCustomerFormVisible: boolean;
  onRefresh: (options?: RefetchOptions) => Promise<void>;
  onAddCustomerFormToggle: () => void;
};

const CustomerList: React.FC<CustomerListType> = ({
  clients,
  isSearchbarVisible,
  onSearchbarClose,
  isAddCustomerFormVisible,
  onRefresh,
  onAddCustomerFormToggle,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const searchHandler = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearIconPress = () => {
    setSearchQuery('');
    onSearchbarClose();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const renderCustomerItem = useMemo(
    () =>
      ({ item }: { item: CustomerType }) => {
        return <CustomerDetailListRow customer={item} />;
      },
    [],
  );

  useEffect(() => {
    Animated.timing(searchBarOpacity, {
      toValue: isSearchbarVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSearchbarVisible, searchBarOpacity]);

  if (isAddCustomerFormVisible) {
    return <CustomerForm onClose={onAddCustomerFormToggle} />;
  }

  return (
    <ScreenWrapper>
      <Animated.View style={[styles.animatedContainer, { opacity: searchBarOpacity }]}>
        {isSearchbarVisible && (
          <Searchbar
            placeholder={t('global.search')}
            style={styles.searchBar}
            inputStyle={styles.inputStyle}
            iconColor={theme.colors.primary}
            clearIcon={() => <Icon size={16} color={theme.colors.primary} name="close" />}
            value={searchQuery}
            onChangeText={searchHandler}
            onClearIconPress={handleClearIconPress}
          />
        )}
      </Animated.View>
      <FlatList
        style={styles.list}
        data={clients}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCustomerItem}
        ListEmptyComponent={NoData}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </ScreenWrapper>
  );
};

export default CustomerList;
