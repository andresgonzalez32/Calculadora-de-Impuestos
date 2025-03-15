package com.taxcalculator.views;

import javax.swing.*;
import java.awt.*;
import java.text.NumberFormat;
import java.util.Locale;

public class HousingPanel extends JPanel {
    private MainFrame mainFrame;
    private JTextField idField;
    private JTextField ownerField;
    private JTextField valueField;
    private JTextField areaField;
    private JTextField builtAreaField;
    private JLabel resultLabel;
    private JLabel rateLabel;
    
    public HousingPanel(MainFrame mainFrame) {
        this.mainFrame = mainFrame;
        setLayout(new BorderLayout());
        
        // Form Panel
        JPanel formPanel = new JPanel(new GridLayout(6, 2, 10, 10));
        formPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        
        // Add form fields
        formPanel.add(new JLabel("ID de Vivienda:"));
        idField = new JTextField();
        formPanel.add(idField);
        
        formPanel.add(new JLabel("Propietario:"));
        ownerField = new JTextField();
        formPanel.add(ownerField);
        
        formPanel.add(new JLabel("Avalúo:"));
        valueField = new JTextField();
        formPanel.add(valueField);
        
        formPanel.add(new JLabel("Área Total (m²):"));
        areaField = new JTextField();
        formPanel.add(areaField);
        
        formPanel.add(new JLabel("Metros Cuadrados Construidos:"));
        builtAreaField = new JTextField();
        formPanel.add(builtAreaField);
        
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
            double area = Double.parseDouble(areaField.getText());
            double builtArea = Double.parseDouble(builtAreaField.getText());
            
            // Calculate tax rate based on area and built area percentage
            double constructionPercentage = (builtArea / area) * 100;
            double rate;
            String rateDescription;
            
            if (area < 1000) {
                rate = 0.005;
                rateDescription = "0.5% (Área < 1000m²)";
            } else if (constructionPercentage > 50) {
                rate = 0.02;
                rateDescription = "2% (Área > 1000m² y construcción > 50%)";
            } else {
                rate = 0.01;
                rateDescription = "1% (Área > 1000m² y construcción ≤ 50%)";
            }
            
            double tax = value * rate;
            
            // Format and display result
            NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("es", "CO"));
            resultLabel.setText("Resultado: " + formatter.format(tax));
            rateLabel.setText("Tasa aplicada: " + rateDescription);
            
            // Update total taxes in welcome panel
            mainFrame.updateTotalTaxes(tax, "housingTax");
            
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this,
                "Por favor ingrese valores numéricos válidos",
                "Error",
                JOptionPane.ERROR_MESSAGE);
        }
    }
}