import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { GlassContainer } from '../components/GlassContainer';
import { COLORS } from '../theme/theme';
import { useHealth } from '../state/HealthContext';
import { fetchSavedPatientsApi, deletePatientAccountApi, SavedPatientSummary } from '../services/api';

export const LoginScreen: React.FC = () => {
  const { loginPatient, triggerHaptic } = useHealth();
  const [userId, setUserId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedPatients, setSavedPatients] = useState<SavedPatientSummary[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    fetchSavedPatientsApi().then((list) => {
      if (list && list.length > 0) {
        setSavedPatients(list);
      }
    });
  }, []);

  const handleDeletePatient = async (targetUserId: string) => {
    triggerHaptic('medium');
    await deletePatientAccountApi(targetUserId);
    setSavedPatients((prev) => prev.filter((p) => p.userId !== targetUserId));
    if (userId === targetUserId) {
      setUserId('');
      setPatientName('');
      setContactNumber('');
    }
  };

  const matchingPatient = savedPatients.find(
    (p) => p.userId.toLowerCase() === userId.trim().toLowerCase()
  );

  const filteredSuggestions = userId.trim() && showSuggestions
    ? savedPatients.filter(
        (p) =>
          p.userId.toLowerCase().includes(userId.trim().toLowerCase()) ||
          p.patientName.toLowerCase().includes(userId.trim().toLowerCase())
      )
    : [];

  const handleLogin = async () => {
    setErrorMsg('');

    if (!userId.trim()) {
      triggerHaptic('heavy');
      setErrorMsg('User ID is required.');
      return;
    }

    setLoading(true);
    triggerHaptic('medium');

    try {
      await loginPatient(userId.trim(), patientName.trim() || 'Patient', contactNumber.trim() || undefined);
    } catch (err: any) {
      triggerHaptic('heavy');
      setErrorMsg(err.message || 'Login failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (id: string, name: string, contact?: string) => {
    triggerHaptic('light');
    setUserId(id);
    setPatientName(name);
    setContactNumber(contact || '');
    setErrorMsg('');
    setShowSuggestions(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInUp.duration(600).springify()} style={styles.centerCardContainer}>
          <GlassContainer style={styles.card} intensity={85} borderRadius={24}>
            {/* Header / Logo */}
            <View style={styles.header}>
              <View style={styles.badgeIcon}>
                <Text style={styles.badgeText}>⚕️</Text>
              </View>
              <Text style={styles.title}>Patient Portal</Text>
              <Text style={styles.subtitle}>Enter your User ID to access your personal health records</Text>
            </View>

            {errorMsg ? (
              <Animated.View entering={FadeIn.duration(200)} style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
              </Animated.View>
            ) : null}

            {matchingPatient ? (
              <Animated.View entering={FadeIn.duration(200)} style={styles.savedFoundBox}>
                <Text style={styles.savedFoundText}>
                  ✓ Account Found: <Text style={{ fontWeight: '800' }}>{matchingPatient.patientName}</Text> ({matchingPatient.recordCount || 0} saved logs in database)
                </Text>
              </Animated.View>
            ) : null}

            {/* Input Form */}
            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>User ID</Text>
                <Text style={styles.requiredBadge}>Required</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g. PAT-90210 or p-101"
                placeholderTextColor={COLORS.textMuted}
                value={userId}
                onChangeText={(text) => {
                  setUserId(text);
                  setShowSuggestions(true);
                  if (errorMsg) setErrorMsg('');

                  // Auto-fill patient details if exact match
                  const match = savedPatients.find(
                    (sp) => sp.userId.toLowerCase() === text.trim().toLowerCase()
                  );
                  if (match) {
                    setPatientName(match.patientName);
                    if (match.contactNumber) setContactNumber(match.contactNumber);
                  }
                }}
                autoCapitalize="characters"
                autoCorrect={false}
              />

              {/* Autocomplete Dropdown */}
              {filteredSuggestions.length > 0 && userId.trim() !== matchingPatient?.userId ? (
                <View style={styles.suggestionsBox}>
                  <Text style={styles.suggestionsTitle}>🔍 Saved Patient Accounts Found:</Text>
                  {filteredSuggestions.map((sp) => (
                    <View key={sp.userId} style={styles.suggestionRow}>
                      <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {
                          fillQuickDemo(sp.userId, sp.patientName, sp.contactNumber || '');
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.suggestionName}>{sp.patientName}</Text>
                          <Text style={styles.suggestionId}>ID: {sp.userId}</Text>
                        </View>
                        <View style={styles.recordBadge}>
                          <Text style={styles.recordBadgeText}>{sp.recordCount} logs</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteChipBtn}
                        onPress={() => handleDeletePatient(sp.userId)}
                      >
                        <Text style={styles.deleteChipText}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Patient Name</Text>
                <Text style={styles.optionalBadge}>Optional</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g. Sarah Jenkins"
                placeholderTextColor={COLORS.textMuted}
                value={patientName}
                onChangeText={(text) => {
                  setPatientName(text);
                  if (errorMsg) setErrorMsg('');
                }}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Contact Number</Text>
                <Text style={styles.optionalBadge}>Optional</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g. +1 (555) 234-5678"
                placeholderTextColor={COLORS.textMuted}
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginBtnText}>Access Health Portal →</Text>
              )}
            </TouchableOpacity>

            {/* Quick Demo & Saved Accounts Selector */}
            <View style={styles.demoSection}>
              <Text style={styles.demoTitle}>📂 Saved Patient Accounts (1-Tap Quick Access):</Text>
              <View style={styles.demoChips}>
                {savedPatients.length > 0 ? (
                  savedPatients.map((p) => (
                    <View key={p.userId} style={[styles.chip, userId === p.userId && styles.chipActive]}>
                      <TouchableOpacity
                        onPress={() => {
                          fillQuickDemo(p.userId, p.patientName, p.contactNumber || '');
                        }}
                      >
                        <Text style={[styles.chipText, userId === p.userId && styles.chipTextActive]}>
                          👤 {p.patientName} ({p.userId}) • {p.recordCount || 0} logs
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteChipBtn}
                        onPress={() => handleDeletePatient(p.userId)}
                      >
                        <Text style={styles.deleteChipText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.chip}
                      onPress={() => fillQuickDemo('PAT-90210', 'Patient', '')}
                    >
                      <Text style={styles.chipText}>Patient (PAT-90210)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.chip}
                      onPress={() => fillQuickDemo('P-101', 'Alice Vance', '555-0192')}
                    >
                      <Text style={styles.chipText}>Alice (P-101)</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </GlassContainer>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  centerCardContainer: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  card: {
    padding: 24,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  badgeText: {
    fontSize: 26,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  requiredBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  optionalBadge: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnDisabled: {
    opacity: 0.6,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  savedFoundBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  savedFoundText: {
    color: '#059669',
    fontSize: 12.5,
    fontWeight: '600',
  },
  suggestionsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.25)',
    marginTop: 6,
    padding: 8,
    maxHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  suggestionsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 6,
    paddingHorizontal: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    marginBottom: 4,
  },
  suggestionName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  suggestionId: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  recordBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  recordBadgeText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  demoSection: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
    paddingTop: 16,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  demoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  chipActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: '#3B82F6',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  chipTextActive: {
    color: '#1D4ED8',
    fontWeight: '700',
  },
  deleteChipBtn: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 4,
  },
  deleteChipText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
  },
});
