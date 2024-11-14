import numpy as np
import matplotlib.pyplot as plt
from scipy.special import gammainc
from scipy.stats import norm

# Define the Probability of Detection (PD) for quantum radar
def PD_quantum(N, delta, lambda_value):
    """
    Quantum Radar PD = P(V > λ | H1) = Q(N / sqrt(2δ))
    """
    return 1 - gammainc(N, lambda_value / (2 * delta))

# Define the Probability of False Alarm (PFA) for quantum radar
def PFA_quantum(N, lambda_value):
    """
    Quantum Radar PFA = P(V > λ | H0) = Γ(N, λ / 2N0) / Γ(N)
    """
    return gammainc(N, lambda_value / (2 * N))

# Define the Alamouti-based radar system PD (using Alamouti Scheme)
def PD_alamouti(N, delta, lambda_value):
    """
    Alamouti scheme PD: Improved performance due to spatial diversity
    """
    return 1 - gammainc(N * 2, lambda_value / (2 * delta))  # Typically, Alamouti increases the detection performance

# Define the Alamouti-based radar system PFA (using Alamouti Scheme)
def PFA_alamouti(N, lambda_value):
    """
    Alamouti scheme PFA: Improved performance due to spatial diversity
    """
    return gammainc(N * 2, lambda_value / (2 * N))  # Alamouti typically lowers PFA by improving signal reception

# Parameters
N = 2  # Number of channels (can be adjusted based on system)
delta = 1  # Noise parameter (adjust as needed)
lambda_values = np.linspace(0.1, 10, 100)  # Range of threshold values

# Calculate PFA and PD for Quantum Radar (no Alamouti)
PFA_quantum_values = [PFA_quantum(N, lambda_value) for lambda_value in lambda_values]
PD_quantum_values = [PD_quantum(N, delta, lambda_value) for lambda_value in lambda_values]

# Calculate PFA and PD for Quantum Radar with Alamouti Scheme
PFA_alamouti_values = [PFA_alamouti(N, lambda_value) for lambda_value in lambda_values]
PD_alamouti_values = [PD_alamouti(N, delta, lambda_value) for lambda_value in lambda_values]

# Plot the ROC curve
plt.plot(PFA_quantum_values, PD_quantum_values, label='Quantum Radar (No Alamouti)', linestyle='-', color='b')
plt.plot(PFA_alamouti_values, PD_alamouti_values, label='Quantum Radar (With Alamouti)', linestyle='--', color='r')

# Plot formatting
plt.xscale('log')  # Logarithmic scale for x-axis
plt.xlabel('Probability of False Alarm (PFA)')
plt.ylabel('Probability of Detection (PD)')
plt.title('ROC Curve Comparison for Quantum Radar')

# Add grid and legend
plt.grid(True)
plt.legend()
plt.show()
