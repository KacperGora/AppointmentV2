export const pl = {
  translation: {
    global: {
      login: 'Login',
      password: 'Hasło',
      signIn: 'Zaloguj się',
      signUp: 'Zarejestruj się',
      welcome: 'Witaj',
      logout: 'Wyloguj',
      search: 'Szukaj',
      success: 'Sukces',
      error: 'Błąd',
      confirmation: 'Potwierdzenie',
      welcomeBack: 'Witaj ponownie',
      send: 'Wyślij',
      noData: 'Brak danych',
      success: 'Sukces',
    },
    screenNames: {
      login: 'Logowanie',
      register: 'Rejestracja',
      remindPassword: 'Przypomnij hasło',
      appointments: 'Wizyty',
      clients: 'Klienci',
      company: 'Firma',
      clientDetails: 'Szczegóły klienta',
      clientsBase: 'Baza klientów',
      statistics: 'Statystyki',
      calendar: 'Kalendarz',
      homeTabs: 'Strona główna',
    },
    login: {
      password: 'Hasło',
      showPassword: 'Pokaż hasło',
      dontHaveAccount: 'Nie masz konta?',
      password: 'Hasło',
      sign: 'Zaloguj',
      forgetPassword: 'Zapomniałeś hasła?',
    },
    register: {
      haveAnAccount: 'Masz już konto?',
      confirmPassword: 'Potwierdź hasło',
      success: 'Konto zostało utworzone',
    },
    remindPassword: {
      title: 'Przypomnij hasło',
      emailPlaceholder: 'Wpisz email',
      sendButton: 'Wyślij',
      invalidEmail: 'Niepoprawny email',
      emailSent: 'Email został wysłany',
    },
    navigation: {
      appointments: 'Wizyty',
      clients: 'Klienci',
      company: 'Firma',
      clientDetails: 'Szczegóły klienta',
      clientsBase: 'Baza klientów',
      statistics: 'Statystyki',
    },
    form: {
      username: 'Nazwa użytkownika',
      password: 'Hasło',
      confirmPassword: 'Potwierdź hasło',
      save: 'Zapisz',
      cancel: 'Anuluj',
      name: 'Imię',
      lastName: 'Nazwisko',
      phone: 'Telefon',
      email: 'Email',
      address: 'Adres',
      city: 'Miasto',
      postalCode: 'Kod pocztowy',
      country: 'Kraj',
      street: 'Ulica',
      typeToSearch: 'Wpisz aby wyszukać',
      selectClient: 'Wybierz klienta',
      selectService: 'Wybierz usługę',
      serviceName: 'Nazwa usługi',
      serviceNamePlaceholder: 'Wpisz nazwę usługi (opcjonalnie)',
      serviceDescription: 'Opis usługi (opcjonalnie)',
      serviceDescriptionPlaceholder: 'Wpisz opis usługi',
      servicePrice: 'Domyślna cena',
      servicePricePlaceholder: 'Wpisz cenę usługi',
      serviceDuration: 'Domyslny czas trwania (min)',
      serviceDurationPlaceholder: 'Wpisz czas trwania usługi',
      forgotPassword: 'Nie pamiętasz hasła?',
      serviceDurationHelper:
        'Czas trwania usługi powinien wynosić wielokrotność\n15 minut dla lepszego zarządzania harmonogramem wizyt.',
      passwordStrength: 'Siła hasła',
      weak: 'Słabe',
      fair: 'Średnie',
      good: 'Dobre',
      strong: 'Silne',
      passwordLengthError: 'Hasło musi mieć co najmniej 6 znaków',
      passwordCapitalLetterError: 'Hasło musi zawierać co najmniej jedną wielką literę',
      passwordSpecialCharacterError: 'Hasło musi zawierać co najmniej jeden znak specjalny',
      passwordNumberError: 'Hasło musi zawierać co najmniej jedną cyfrę',
      passwordMatchError: 'Hasła nie pasują do siebie',
      passwordMetRequirements: 'Hasło spełnia wymagania',
      addClient: 'Nie widzisz swojego klienta? Dodaj go',
      price: 'Cena',
      notes: 'Notatki',
      addService: 'Dodaj nową usługę',
      goBack: 'Wróć',
      customerData: 'Dane klienta',
      serviceData: 'Dane usługi',
      appointmentDate: 'Data wizyty',
    },
    validation: {
      fieldRequired: 'Pole jest wymagane',
      mustBeNumber: 'Wartość musi być liczbą',
      mustBePositiveNumber: 'Wartość musi być liczbą dodatnią',
      validPrice: 'Wartość musi być liczbą dodatnią z dwoma miejscami po przecinku',
      mutlitleBy15: 'Wartość musi być wielokrotnością 15',
      mustBeInteger: 'Wartość musi być liczbą całkowitą',
      nameIsRequied: 'Imię jest wymagane',
      lastNameIsRequied: 'Nazwisko jest wymagane',
      phoneNumberMustBeExact: 'Numer telefonu musi mieć dokładnie 9 cyfr',
    },
    filters: {
      search: 'Szukaj',
      reset: 'Resetuj',
      searchForService: 'Szukaj usługi',
    },
    client: {
      clientBase: 'Baza klientów',
      addCustomer: 'Dodaj klienta',
      deleteCustomer: 'Usuń klienta',
      deletetionSuccess: 'Klient został usunięty',
      deletionError: 'Wystąpił błąd podczas usuwania klienta',
      deletionConfirmation: 'Czy na pewno chcesz usunąć klienta',
      mostValuableClients: 'Najbardziej wartościowi klienci',
      totalCustomers: 'Liczba klientów',
      newCustomers: 'Nowi klienci',
      thisWeek: 'W tym tygodniu {{ count }}',
      thisMonth: 'W tym miesiącu {{ count }}',
      thisYear: 'W tym roku',
      newestCustomer: 'Najnowszy klient',
    },
    company: {
      dashboard: 'Pulpit',
      employees: 'Pracownicy',
      services: 'Usługi',
      experience: 'Doświadczenie:',
      position: 'Stanowisko {{ position }}',
      contact: 'Kontakt {{ contact }}',
      addNewService: 'Dodaj nową usługę',
    },
    calendar: {
      addNewVisit: 'Dodaj nową wizytę',
      service: 'Usługa',
      startDate: 'Data rozpoczęcia',
      endDate: 'Data zakończenia',
      notes: 'Uwagi',
      dailyCalendar: 'Jeden dzień',
      fullWeek: 'Tydzień',
      withoutWeekends: 'Bez weekendów',
    },
    formError: {
      usernameLength: 'Nazwa użytkownika musi mieć co najmniej 3 znaki',
      passwordLength: 'Hasło musi mieć co najmniej 6 znaków',
    },
    error: {
      INVALID_CREDENTIALS: 'Niepoprawne dane logowania',
      USER_ALREADY_EXISTS: 'Użytkownik już istnieje',
      usernameLength: 'Nazwa użytkownika musi mieć co najmniej 3 znaki',
      passwordsDontMatch: 'Hasła nie pasują do siebie',
      passwordLength: 'Hasło musi mieć co najmniej 6 znaków',
    },
  },
};
