import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { useHealth } from '../state/HealthContext';
import { GlassContainer } from './GlassContainer';
import { COLORS } from '../theme/theme';
import { useLanguage } from '../state/LanguageContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Classification helpers
const getBPCategory = (sys: number, dia: number) => {
  if (sys > 180 || dia > 120) return { label: 'Hypertensive Crisis', color: '#991B1B', bg: 'rgba(153, 27, 27, 0.12)' };
  if (sys >= 140 || dia >= 90) return { label: 'Hypertension Stage 2', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' };
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return { label: 'Hypertension Stage 1', color: '#D97706', bg: 'rgba(217, 119, 6, 0.12)' };
  if (sys >= 120 && sys <= 129 && dia < 80) return { label: 'Elevated BP', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' };
  if ((sys > 0 && sys < 90) || (dia > 0 && dia < 60)) return { label: 'Hypotension (Low BP)', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' };
  return { label: 'Normal BP', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
};

const getSugarCategory = (sugar: number) => {
  if (sugar < 70) return { label: 'Hypoglycemia (Low Sugar)', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' };
  if (sugar <= 99) return { label: 'Normal Fasting Sugar', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
  if (sugar <= 140) return { label: 'Normal Post-Meal Sugar', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
  if (sugar <= 199) return { label: 'Elevated / Pre-Diabetic', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' };
  return { label: 'Hyperglycemia (High Sugar)', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' };
};

const getHRCategory = (hr: number) => {
  if (hr < 60) return { label: 'Bradycardia (Low)', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' };
  if (hr <= 100) return { label: 'Normal HR', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
  return { label: 'Tachycardia (High)', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' };
};

const getTempCategory = (temp: number, unit: 'F' | 'C') => {
  const tempF = unit === 'F' ? temp : (temp * 9) / 5 + 32;
  if (tempF < 95.0) return { label: 'Hypothermia (Low)', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' };
  if (tempF <= 99.0) return { label: 'Normal Temp', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
  if (tempF <= 100.4) return { label: 'Low-grade Fever', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' };
  return { label: 'High Fever', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' };
};

const getSpO2Category = (spo2: number) => {
  if (spo2 >= 95) return { label: 'Optimal SpO2', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
  if (spo2 >= 90) return { label: 'Mild Hypoxia', color: '#D97706', bg: 'rgba(217, 119, 6, 0.12)' };
  return { label: 'Severe Hypoxia', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' };
};

export const VitalsModal: React.FC = () => {
  const { isVitalsOpen, setVitalsOpen, addVitalLog, triggerHaptic } = useHealth();
  const { t } = useLanguage();

  // Local state for each vital input as strings to support direct text typing
  const [systolic, setSystolic] = useState<string>('120');
  const [diastolic, setDiastolic] = useState<string>('80');
  const [bloodSugar, setBloodSugar] = useState<string>('95');
  const [heartRate, setHeartRate] = useState<string>('72');
  const [temperature, setTemperature] = useState<string>('98.6');
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [oxygenSaturation, setOxygenSaturation] = useState<string>('98');
  const [notes, setNotes] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'BP' | 'GLUCOSE' | 'HR' | 'TEMP' | 'SPO2'>('BP');

  // Pulsing heart animation hook
  const heartScale = useSharedValue(1);

  useEffect(() => {
    if (!isVitalsOpen) {
      cancelAnimation(heartScale);
      return;
    }
    const hrNum = parseInt(heartRate, 10) || 72;
    const pulseDuration = 60000 / hrNum;
    // Keep it bound within reasonable bounds
    const safeDuration = Math.min(2000, Math.max(300, pulseDuration));
    
    heartScale.value = withRepeat(
      withSequence(
        withTiming(1.22, { duration: safeDuration * 0.25 }),
        withTiming(0.95, { duration: safeDuration * 0.15 }),
        withTiming(1.05, { duration: safeDuration * 0.15 }),
        withTiming(1.0, { duration: safeDuration * 0.45 })
      ),
      -1,
      false
    );
  }, [heartRate, isVitalsOpen]);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleSave = () => {
    const sysParsed = parseInt(systolic, 10);
    const diaParsed = parseInt(diastolic, 10);
    const sugarParsed = parseInt(bloodSugar, 10);
    const hrParsed = parseInt(heartRate, 10);
    const tempParsed = parseFloat(temperature);
    const spo2Parsed = parseInt(oxygenSaturation, 10);

    addVitalLog({
      systolic: isNaN(sysParsed) ? 120 : sysParsed,
      diastolic: isNaN(diaParsed) ? 80 : diaParsed,
      bloodSugar: isNaN(sugarParsed) ? undefined : sugarParsed,
      temperature: isNaN(tempParsed) ? (tempUnit === 'F' ? 98.6 : 37.0) : tempParsed,
      heartRate: isNaN(hrParsed) ? 72 : hrParsed,
      oxygenSaturation: isNaN(spo2Parsed) ? 98 : spo2Parsed,
      notes: notes.trim() ? notes.trim() : undefined,
    });
    // Reset values to defaults
    setSystolic('120');
    setDiastolic('80');
    setBloodSugar('95');
    setHeartRate('72');
    setTemperature(tempUnit === 'F' ? '98.6' : '37.0');
    setOxygenSaturation('98');
    setNotes('');
    setVitalsOpen(false);
  };

  const handleCancel = () => {
    triggerHaptic('light');
    setVitalsOpen(false);
  };

  const adjustVal = (vital: string, direction: 'up' | 'down', step = 1) => {
    triggerHaptic('selection');
    switch (vital) {
      case 'systolic':
        setSystolic((prevStr) => {
          const parsed = parseInt(prevStr, 10);
          const prev = isNaN(parsed) ? 120 : parsed;
          const next = prev + (direction === 'up' ? step : -step);
          return String(Math.max(40, Math.min(240, next)));
        });
        break;
      case 'diastolic':
        setDiastolic((prevStr) => {
          const parsed = parseInt(prevStr, 10);
          const prev = isNaN(parsed) ? 80 : parsed;
          const next = prev + (direction === 'up' ? step : -step);
          return String(Math.max(20, Math.min(140, next)));
        });
        break;
      case 'sugar':
        setBloodSugar((prevStr) => {
          const parsed = parseInt(prevStr, 10);
          const prev = isNaN(parsed) ? 95 : parsed;
          const next = prev + (direction === 'up' ? step : -step);
          return String(Math.max(20, Math.min(600, next)));
        });
        break;
      case 'hr':
        setHeartRate((prevStr) => {
          const parsed = parseInt(prevStr, 10);
          const prev = isNaN(parsed) ? 72 : parsed;
          const next = prev + (direction === 'up' ? step : -step);
          return String(Math.max(30, Math.min(240, next)));
        });
        break;
      case 'temp':
        setTemperature((prevStr) => {
          const parsed = parseFloat(prevStr);
          const prev = isNaN(parsed) ? (tempUnit === 'F' ? 98.6 : 37.0) : parsed;
          const next = prev + (direction === 'up' ? step : -step);
          if (tempUnit === 'F') {
            return String(Math.round(Math.max(80, Math.min(115, next)) * 10) / 10);
          } else {
            return String(Math.round(Math.max(25, Math.min(45, next)) * 10) / 10);
          }
        });
        break;
      case 'spo2':
        setOxygenSaturation((prevStr) => {
          const parsed = parseInt(prevStr, 10);
          const prev = isNaN(parsed) ? 98 : parsed;
          const next = prev + (direction === 'up' ? step : -step);
          return String(Math.max(50, Math.min(100, next)));
        });
        break;
    }
  };

  const toggleTempUnit = () => {
    triggerHaptic('selection');
    if (tempUnit === 'F') {
      setTempUnit('C');
      setTemperature((t) => {
        const val = parseFloat(t) || 98.6;
        return String(Math.round(((val - 32) * 5) / 9 * 10) / 10);
      });
    } else {
      setTempUnit('F');
      setTemperature((t) => {
        const val = parseFloat(t) || 37.0;
        return String(Math.round(((val * 9) / 5 + 32) * 10) / 10);
      });
    }
  };

  const sysNum = parseInt(systolic, 10);
  const diaNum = parseInt(diastolic, 10);
  const sugarNum = parseInt(bloodSugar, 10);
  const hrNum = parseInt(heartRate, 10);
  const tempNum = parseFloat(temperature);
  const spo2Num = parseInt(oxygenSaturation, 10);

  const bpInfo = getBPCategory(isNaN(sysNum) ? 120 : sysNum, isNaN(diaNum) ? 80 : diaNum);
  const sugarInfo = getSugarCategory(isNaN(sugarNum) ? 95 : sugarNum);
  const hrInfo = getHRCategory(isNaN(hrNum) ? 72 : hrNum);
  const tempInfo = getTempCategory(isNaN(tempNum) ? 98.6 : tempNum, tempUnit);
  const spo2Info = getSpO2Category(isNaN(spo2Num) ? 98 : spo2Num);

  // Tab configurations
  const tabs = [
    { id: 'BP', label: t('Blood Pressure'), valStr: `${systolic}/${diastolic}`, color: bpInfo.color },
    { id: 'GLUCOSE', label: t('Blood Sugar'), valStr: `${bloodSugar} mg/dL`, color: sugarInfo.color },
    { id: 'HR', label: t('Heart Rate'), valStr: `${heartRate} bpm`, color: hrInfo.color },
    { id: 'TEMP', label: t('Temp'), valStr: `${temperature}°${tempUnit}`, color: tempInfo.color },
    { id: 'SPO2', label: t('Oxygen Sat'), valStr: `${oxygenSaturation}%`, color: spo2Info.color },
  ];

  return (
    <Modal
      visible={isVitalsOpen}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleCancel}
        />
        
        <GlassContainer style={styles.modalCard} intensity={80}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerSub}>QUICK VITALS LOGGER</Text>
              <Text style={styles.headerTitle}>Record Measurements</Text>
            </View>
            <TouchableOpacity onPress={handleCancel} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Stats Grid / Navigation Tab Bar */}
          <View style={styles.tabGrid}>
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tabCell,
                    isSelected && { borderColor: tab.color, backgroundColor: 'rgba(255,255,255,0.88)' },
                  ]}
                  onPress={() => {
                    triggerHaptic('light');
                    setActiveTab(tab.id as any);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.tabLabel} numberOfLines={1}>{tab.label}</Text>
                  <Text style={[styles.tabVal, { color: tab.color }]}>{tab.valStr}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* BLOOD PRESSURE CELL */}
            {activeTab === 'BP' && (
              <View style={styles.contentCell}>
                <View style={[styles.statusBadge, { backgroundColor: bpInfo.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: bpInfo.color }]}>
                    {bpInfo.label}
                  </Text>
                </View>

                {/* Systolic Controller */}
                <Text style={styles.sectionSubtitle}>Systolic (Upper / Pressure when heart beats)</Text>
                <View style={styles.adjustableRow}>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('systolic', 'down')}
                    onLongPress={() => adjustVal('systolic', 'down', 5)}
                  >
                    <Text style={styles.adjustBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={styles.valueWrapper}>
                    <TextInput
                      style={[styles.largeValueInput, { color: bpInfo.color }]}
                      value={systolic}
                      onChangeText={(txt) => setSystolic(txt.replace(/[^0-9]/g, ''))}
                      keyboardType="numeric"
                      maxLength={3}
                      selectTextOnFocus
                    />
                    <Text style={styles.valueUnit}>sys mmHg</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('systolic', 'up')}
                    onLongPress={() => adjustVal('systolic', 'up', 5)}
                  >
                    <Text style={styles.adjustBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Diastolic Controller */}
                <Text style={styles.sectionSubtitle}>Diastolic (Lower / Pressure between beats)</Text>
                <View style={styles.adjustableRow}>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('diastolic', 'down')}
                    onLongPress={() => adjustVal('diastolic', 'down', 5)}
                  >
                    <Text style={styles.adjustBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={styles.valueWrapper}>
                    <TextInput
                      style={[styles.largeValueInput, { color: bpInfo.color }]}
                      value={diastolic}
                      onChangeText={(txt) => setDiastolic(txt.replace(/[^0-9]/g, ''))}
                      keyboardType="numeric"
                      maxLength={3}
                      selectTextOnFocus
                    />
                    <Text style={styles.valueUnit}>dia mmHg</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('diastolic', 'up')}
                    onLongPress={() => adjustVal('diastolic', 'up', 5)}
                  >
                    <Text style={styles.adjustBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Quick Presets for BP */}
                <View style={styles.presetsWrapper}>
                  <Text style={styles.presetHeading}>QUICK PRESETS (1-TAP SET):</Text>
                  <View style={styles.presetButtonsRow}>
                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(59, 130, 246, 0.12)', borderColor: '#3B82F6' }]}
                      onPress={() => { triggerHaptic('selection'); setSystolic('85'); setDiastolic('55'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#3B82F6' }]}>Low (85/55)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderColor: '#10B981' }]}
                      onPress={() => { triggerHaptic('selection'); setSystolic('120'); setDiastolic('80'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#10B981' }]}>Normal (120/80)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(245, 158, 11, 0.12)', borderColor: '#F59E0B' }]}
                      onPress={() => { triggerHaptic('selection'); setSystolic('126'); setDiastolic('78'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#F59E0B' }]}>Elevated (126/78)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(217, 119, 6, 0.12)', borderColor: '#D97706' }]}
                      onPress={() => { triggerHaptic('selection'); setSystolic('135'); setDiastolic('85'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#D97706' }]}>Stage 1 (135/85)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: '#EF4444' }]}
                      onPress={() => { triggerHaptic('selection'); setSystolic('145'); setDiastolic('95'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#EF4444' }]}>Stage 2 (145/95)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(153, 27, 27, 0.12)', borderColor: '#991B1B' }]}
                      onPress={() => { triggerHaptic('selection'); setSystolic('185'); setDiastolic('125'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#991B1B' }]}>Crisis (185/125)</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {/* BLOOD SUGAR CELL */}
            {activeTab === 'GLUCOSE' && (
              <View style={styles.contentCell}>
                <View style={[styles.statusBadge, { backgroundColor: sugarInfo.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: sugarInfo.color }]}>
                    {sugarInfo.label}
                  </Text>
                </View>

                <Text style={styles.sectionSubtitle}>Blood Sugar / Glucose Concentration</Text>
                <View style={styles.adjustableRow}>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('sugar', 'down')}
                    onLongPress={() => adjustVal('sugar', 'down', 5)}
                  >
                    <Text style={styles.adjustBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={styles.valueWrapper}>
                    <TextInput
                      style={[styles.largeValueInput, { color: sugarInfo.color }]}
                      value={bloodSugar}
                      onChangeText={(txt) => setBloodSugar(txt.replace(/[^0-9]/g, ''))}
                      keyboardType="numeric"
                      maxLength={3}
                      selectTextOnFocus
                    />
                    <Text style={styles.valueUnit}>mg/dL</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('sugar', 'up')}
                    onLongPress={() => adjustVal('sugar', 'up', 5)}
                  >
                    <Text style={styles.adjustBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Quick Presets for Blood Sugar */}
                <View style={styles.presetsWrapper}>
                  <Text style={styles.presetHeading}>QUICK PRESETS (1-TAP SET):</Text>
                  <View style={styles.presetButtonsRow}>
                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(59, 130, 246, 0.12)', borderColor: '#3B82F6' }]}
                      onPress={() => { triggerHaptic('selection'); setBloodSugar('65'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#3B82F6' }]}>Low Sugar (65)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderColor: '#10B981' }]}
                      onPress={() => { triggerHaptic('selection'); setBloodSugar('90'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#10B981' }]}>Fasting (90)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderColor: '#10B981' }]}
                      onPress={() => { triggerHaptic('selection'); setBloodSugar('130'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#10B981' }]}>Post-Meal (130)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(245, 158, 11, 0.12)', borderColor: '#F59E0B' }]}
                      onPress={() => { triggerHaptic('selection'); setBloodSugar('165'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#F59E0B' }]}>Elevated (165)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: '#EF4444' }]}
                      onPress={() => { triggerHaptic('selection'); setBloodSugar('220'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#EF4444' }]}>High (220)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.presetChip, { backgroundColor: 'rgba(153, 27, 27, 0.12)', borderColor: '#991B1B' }]}
                      onPress={() => { triggerHaptic('selection'); setBloodSugar('320'); }}
                    >
                      <Text style={[styles.presetChipText, { color: '#991B1B' }]}>Severe (320)</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {/* HEART RATE CELL */}
            {activeTab === 'HR' && (
              <View style={styles.contentCell}>
                <View style={[styles.statusBadge, { backgroundColor: hrInfo.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: hrInfo.color }]}>
                    {hrInfo.label}
                  </Text>
                </View>

                <View style={styles.animationContainer}>
                  <Animated.Text style={[styles.pulseHeart, { color: '#EF4444' }, heartStyle]}>♥</Animated.Text>
                  <Text style={styles.animationLabel}>Live pulsing rate indicator</Text>
                </View>

                <View style={styles.adjustableRow}>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('hr', 'down')}
                    onLongPress={() => adjustVal('hr', 'down', 5)}
                  >
                    <Text style={styles.adjustBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={styles.valueWrapper}>
                    <TextInput
                      style={[styles.largeValueInput, { color: hrInfo.color }]}
                      value={heartRate}
                      onChangeText={(txt) => setHeartRate(txt.replace(/[^0-9]/g, ''))}
                      keyboardType="numeric"
                      maxLength={3}
                      selectTextOnFocus
                    />
                    <Text style={styles.valueUnit}>bpm</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('hr', 'up')}
                    onLongPress={() => adjustVal('hr', 'up', 5)}
                  >
                    <Text style={styles.adjustBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* BODY TEMPERATURE CELL */}
            {activeTab === 'TEMP' && (
              <View style={styles.contentCell}>
                <View style={[styles.statusBadge, { backgroundColor: tempInfo.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: tempInfo.color }]}>
                    {tempInfo.label}
                  </Text>
                </View>

                <View style={styles.unitToggleRow}>
                  <TouchableOpacity
                    style={[styles.unitToggleBtn, tempUnit === 'F' && styles.unitToggleBtnActive]}
                    onPress={() => tempUnit !== 'F' && toggleTempUnit()}
                  >
                    <Text style={[styles.unitToggleText, tempUnit === 'F' && styles.unitToggleTextActive]}>Fahrenheit (°F)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.unitToggleBtn, tempUnit === 'C' && styles.unitToggleBtnActive]}
                    onPress={() => tempUnit !== 'C' && toggleTempUnit()}
                  >
                    <Text style={[styles.unitToggleText, tempUnit === 'C' && styles.unitToggleTextActive]}>Celsius (°C)</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.adjustableRow}>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('temp', 'down', 0.1)}
                    onLongPress={() => adjustVal('temp', 'down', 1.0)}
                  >
                    <Text style={styles.adjustBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={styles.valueWrapper}>
                    <TextInput
                      style={[styles.largeValueInput, { color: tempInfo.color }]}
                      value={temperature}
                      onChangeText={(txt) => {
                        const formatted = txt.replace(/[^0-9.]/g, '');
                        const parts = formatted.split('.');
                        const clean = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : formatted;
                        setTemperature(clean);
                      }}
                      keyboardType="numeric"
                      maxLength={5}
                      selectTextOnFocus
                    />
                    <Text style={styles.valueUnit}>°{tempUnit}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('temp', 'up', 0.1)}
                    onLongPress={() => adjustVal('temp', 'up', 1.0)}
                  >
                    <Text style={styles.adjustBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* OXYGEN SATURATION CELL */}
            {activeTab === 'SPO2' && (
              <View style={styles.contentCell}>
                <View style={[styles.statusBadge, { backgroundColor: spo2Info.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: spo2Info.color }]}>
                    {spo2Info.label}
                  </Text>
                </View>

                <View style={styles.adjustableRow}>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('spo2', 'down')}
                    onLongPress={() => adjustVal('spo2', 'down', 3)}
                  >
                    <Text style={styles.adjustBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={styles.valueWrapper}>
                    <TextInput
                      style={[styles.largeValueInput, { color: spo2Info.color }]}
                      value={oxygenSaturation}
                      onChangeText={(txt) => setOxygenSaturation(txt.replace(/[^0-9]/g, ''))}
                      keyboardType="numeric"
                      maxLength={3}
                      selectTextOnFocus
                    />
                    <Text style={styles.valueUnit}>% SpO2</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => adjustVal('spo2', 'up')}
                    onLongPress={() => adjustVal('spo2', 'up', 3)}
                  >
                    <Text style={styles.adjustBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Notes Section (Common to all tabs) */}
            <View style={styles.notesSection}>
              <Text style={styles.notesTitle}>Optional Notes / Context</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Details (e.g. resting, post-workout, feeling dizzy...)"
                placeholderTextColor="#9898B0"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={2}
              />
            </View>
          </ScrollView>

          {/* Stepper Footer Controls */}
          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>Discard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Reading</Text>
            </TouchableOpacity>
          </View>
        </GlassContainer>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    maxHeight: Math.min(680, SCREEN_HEIGHT * 0.88),
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerSub: {
    color: '#2563EB',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerTitle: {
    color: '#172033',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#55657A',
    fontSize: 12,
    fontWeight: '700',
  },
  tabGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tabCell: {
    flex: 1,
    minWidth: '30%',
    padding: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#8391A5',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  tabVal: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  scrollContent: {
    flex: 1,
    marginBottom: 10,
  },
  contentCell: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(22, 35, 58, 0.05)',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    color: '#55657A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 4,
    textAlign: 'center',
  },
  adjustableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  adjustBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(22, 35, 58, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  adjustBtnText: {
    fontSize: 22,
    fontWeight: '300',
    color: '#172033',
  },
  valueWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  largeValueInput: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    textAlign: 'center',
    padding: 0,
    margin: 0,
    minWidth: 90,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(22, 35, 58, 0.08)',
  },
  valueUnit: {
    color: '#8391A5',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  presetsWrapper: {
    width: '100%',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(22, 35, 58, 0.06)',
    alignItems: 'center',
  },
  presetHeading: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#8391A5',
    letterSpacing: 1,
    marginBottom: 8,
  },
  presetButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  presetChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  presetChipText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  pulseHeart: {
    fontSize: 44,
    marginVertical: 4,
  },
  animationLabel: {
    fontSize: 9,
    color: '#8391A5',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  unitToggleRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    borderRadius: 12,
    padding: 3,
    marginBottom: 12,
  },
  unitToggleBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 9,
    alignItems: 'center',
  },
  unitToggleBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  unitToggleText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#8391A5',
  },
  unitToggleTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  notesSection: {
    marginTop: 14,
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#55657A',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  notesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(22, 35, 58, 0.08)',
    borderRadius: 12,
    padding: 10,
    color: '#172033',
    fontSize: 12.5,
    textAlignVertical: 'top',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(22, 35, 58, 0.08)',
    paddingTop: 14,
    marginTop: 10,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelBtnText: {
    color: '#8391A5',
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
