import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ClockIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CookingConfirmationModal = ({ isVisible, onClose, onConfirm, cookingTime, recipeName }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <ClockIcon size={hp(3)} color="#F97316" />
            <Text style={styles.title}>Ready to Start Cooking?</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.recipeName}>{recipeName}</Text>
            <Text style={styles.timeText}>
              This recipe will take approximately{'\n'}
              <Text style={styles.highlightText}>{cookingTime} minutes</Text> to prepare.
            </Text>
            <Text style={styles.warningText}>
              Make sure you have enough time before starting.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Maybe Later</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>Let's Cook!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: wp('85%'),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#1F2937',
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  recipeName: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 10,
    textAlign: 'center',
  },
  timeText: {
    fontSize: hp(1.8),
    textAlign: 'center',
    color: '#4B5563',
    marginBottom: 8,
  },
  highlightText: {
    color: '#F97316',
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: hp(1.6),
    color: '#6B7280',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  confirmButton: {
    backgroundColor: '#F97316',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: hp(1.8),
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: hp(1.8),
  },
});

export default CookingConfirmationModal;