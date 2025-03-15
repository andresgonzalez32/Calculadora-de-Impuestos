package com.taxcalculator.views;

import javax.swing.*;
import java.awt.*;
import java.text.NumberFormat;
import java.util.Locale;

public class VehiclePanel extends JPanel {
    private MainFrame mainFrame;
    private JTextField idField;
    private JTextField ownerField;
    private JTextField valueField;
    private JTextField modelField;
    private JComboBox<String> fuelTypeCombo;
    private JLabel resultLabel;
    private JLabel rateLabel;
    
    public VehiclePanel(MainFrame mainFrame) {
        this.mainFrame = mainFrame;
        setLayout(new BorderLayout());
        
        // Form Panel
        JPanel formPanel = new JPanel(new GridLayout(6, 2, 10, 10));
        formPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        
        // Add form fields
        formPanel.add(new JLabel("ID del Vehículo:"));
        idField = new JTextField();
        formPanel.add(idField);
        
        formPanel.add(new JLabel("Propietario:"));
        ownerField = new JTextField();
        formPanel.add(ownerField);
        
        formPanel.add(new JLabel("Avalúo Comercial:"));
        valueField = new JTextField();
        formPanel.add(valueField);
        
        formPanel.add(new JLabel("Modelo (Año):"));
        modelField = new JTextField();
        formPanel.add(modelField);
        
        formPanel.add(new JLabel("Tipo de Combustión:"));
        String[] fuelTypes = {"Gasolina", "Diesel", "Eléctrico", "Híbrido"};
        fuelTypeCombo = new JComboBox<>(fuelTypes);
        formPanel.add(fuelTypeCombo);
        
        // Result Panel
        JPanel resultPanel = new JPanel(new GridLayout(3, 1));
        resultPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        
        resultLabel = new JLabel("Resultado: $0.00");
        resultLabel.setFont(new Font("Arial", Font.BOLD, 16));
        
        rateLabel = new JLabel("Tasa aplicada: -");
        rateLabel.setFont(new Font("Arial", Font.PLAIN, 14));
        
        JButton calculateButton = new JButton("Liquidar Impuestos");
        calculateButton.addActionListener(e -> calculateTax());
        
        resultPanel.add(resultLabel);
        resultPanel.add(rateLabel);
        resultPanel.add(calculateButton);
        
        // Navigation Panel
        JPanel navPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JButton backButton = new JButton("Volver");
        backButton.addActionListener(e -> mainFrame.showPanel("Welcome"));
        navPanel.add(backButton);
        
        // Add all panels to main panel
        add(navPanel, BorderLayout.NORTH);
        add(formPanel, BorderLayout.CENTER);
        add(resultPanel, BorderLayout.SOUTH);
    }
    
    private void calculateTax() {
        try {
            double value = Double.parseDouble(valueField.getText());
            int modelYear = Integer.parseInt(modelField.getText());
            String fuelType = (String) fuelTypeCombo.getSelectedItem();
            
            // Calculate tax rate based on model year and fuel type
            double rate;
            String rateDescription;
            
            boolean isHighEmission = (fuelType.equals("Gasolina") || fuelType.equals("Diesel")) 
                                   && modelYear > 2015;
            boolean isEcoFriendly = fuelType.equals("Eléctrico") || fuelType.equals("Híbrido");
            
            if (isHighEmission) {
                rate = 0.03;
                rateDescription = "3% (Modelo > 2015 y combustión tradicional)";
            } else if (isEcoFriendly) {
                rate = 0.01;
                rateDescription = "1% (Vehículo ecológico)";
            } else {
                rate = 0.02;
                rateDescription = "2% (Modelo ≤ 2015)";
            }
            
            double tax = value * rate;
            
            // Format and display result
            NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("es", "CO"));
            resultLabel.setText("Resultado: " + formatter.format(tax));
            rateLabel.setText("Tasa aplicada: " + rateDescription);
            
            // Update total taxes in welcome panel
            mainFrame.updateTotalTaxes(tax, "vehicleTax");
            
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this,
                "Por favor ingrese valores numéricos válidos",
                "Error",
                JOptionPane.ERROR_MESSAGE);
        }
    }
}