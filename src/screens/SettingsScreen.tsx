import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GlassContainer } from '../components/GlassContainer';
import { COLORS } from '../theme/theme';
import { useLanguage } from '../state/LanguageContext';
import { LanguageCode } from '../locales';

export const SettingsScreen: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{t('Settings')}</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassContainer style={styles.settingsCard} intensity={80} borderRadius={16}>
          <Text style={styles.sectionTitle}>{t('Language')}</Text>
          
          <View style={styles.optionsContainer}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.optionButton,
                  language === lang.code && styles.optionButtonActive
                ]}
                onPress={() => setLanguage(lang.code)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionText,
                    language === lang.code && styles.optionTextActive
                  ]}
                >
                  {language === lang.code ? '✓ ' : '  '}{lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassContainer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  settingsCard: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  optionButtonActive: {
    backgroundColor: COLORS.primary + '20', // 20% opacity
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  optionTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
