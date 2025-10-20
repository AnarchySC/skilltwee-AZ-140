// Main JavaScript for AZ-140 Skill Tree
// State variables
let unlockedSkills = {};
let questProgress = {};
let currentSkill = null;

// Initialize the skill tree when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing AZ-140 Skill Tree...');
    initSkillTree();
});

// Initialize the skill tree
function initSkillTree() {
    // Load saved progress from localStorage
    const savedSkills = localStorage.getItem('az140SkillTree');
    const savedQuests = localStorage.getItem('az140QuestProgress');
    
    if (savedSkills) {
        try {
            unlockedSkills = JSON.parse(savedSkills);
            console.log('Loaded saved skills:', unlockedSkills);
        } catch (e) {
            console.error('Error loading saved skills:', e);
            unlockedSkills = {};
        }
    }
    
    if (savedQuests) {
        try {
            questProgress = JSON.parse(savedQuests);
            console.log('Loaded saved quests:', questProgress);
        } catch (e) {
            console.error('Error loading saved quests:', e);
            questProgress = {};
        }
    }
    
    updateProgress();
    restoreUnlockedSkills();
    setupEventListeners();
    updateQuestCount();
    checkTierUnlocking();
}

// Setup event listeners
function setupEventListeners() {
    // Add click listeners to all skills
    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if skill is locked
            if (this.classList.contains('locked')) {
                // Still allow viewing quests even if locked
                console.log('Skill is locked but viewing quests');
            }
            
            const skillId = this.dataset.skill;
            console.log('Skill clicked:', skillId);
            openQuestModal(skillId);
        });
    });

    // Close modal when clicking X
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('questModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Open quest modal
function openQuestModal(skillId) {
    console.log('Opening modal for skill:', skillId);
    
    currentSkill = skillId;
    const modal = document.getElementById('questModal');
    const skillData = skillQuests[skillId];
    
    if (!skillData) {
        console.error('No quest data for skill:', skillId);
        alert('Quest data coming soon for this skill!');
        return;
    }

    // Update modal header
    document.getElementById('modalIcon').textContent = skillData.icon;
    const skillElement = document.querySelector(`[data-skill="${skillId}"]`);
    if (skillElement) {
        const skillNameElement = skillElement.querySelector('.skill-name');
        if (skillNameElement) {
            document.getElementById('modalSkillName').textContent = skillNameElement.textContent;
        }
    }

    // Build quest content
    let questHTML = '<div class="quest-list">';
    
    // Add quest sections
    if (skillData.quests) {
        Object.keys(skillData.quests).forEach(section => {
            questHTML += `
                <div class="quest-section">
                    <div class="quest-section-title">✅ ${section}</div>
            `;
            
            if (Array.isArray(skillData.quests[section])) {
                skillData.quests[section].forEach((quest, index) => {
                    const questId = `${skillId}-${section}-${index}`;
                    const isCompleted = questProgress[questId] || false;
                    
                    questHTML += `
                        <div class="quest-item ${isCompleted ? 'completed' : ''}" data-quest-id="${questId}">
                            <input type="checkbox" class="quest-checkbox" ${isCompleted ? 'checked' : ''}>
                            <span class="quest-text">${quest}</span>
                        </div>
                    `;
                });
            }
            
            questHTML += '</div>';
        });
    }

    // Add resources section
    if (skillData.resources && skillData.resources.length > 0) {
        questHTML += `
            <div class="resources">
                <div class="resources-title">📚 Learning Resources:</div>
        `;
        skillData.resources.forEach(resource => {
            questHTML += `<a href="${resource.url}" class="resource-link" target="_blank">→ ${resource.name}</a>`;
        });
        questHTML += '</div>';
    }

    // Add mastery button
    const allQuests = getAllQuestsForSkill(skillId);
    const completedQuests = allQuests.filter(qId => questProgress[qId]).length;
    const isComplete = completedQuests === allQuests.length && allQuests.length > 0;
    
    const isSkillLocked = skillElement && skillElement.classList.contains('locked');
    
    questHTML += `
        <button class="mastery-button" 
                ${!isComplete || isSkillLocked ? 'disabled' : ''} 
                id="masteryBtn">
            ${unlockedSkills[skillId] ? '✅ Skill Mastered!' : 'Mark as Mastered'} 
            (${completedQuests}/${allQuests.length} quests)
        </button>
    `;
    
    if (isSkillLocked) {
        questHTML += '<p style="text-align: center; margin-top: 10px; color: #94a3b8; font-size: 0.9em;">⚠️ Complete more skills in the previous tier to unlock this skill</p>';
    }
    
    questHTML += '</div>';

    document.getElementById('questContent').innerHTML = questHTML;

    // Add event listeners to checkboxes
    document.querySelectorAll('.quest-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleQuestToggle);
    });

    // Add event listener to mastery button
    const masteryBtn = document.getElementById('masteryBtn');
    if (masteryBtn) {
        masteryBtn.addEventListener('click', handleMastery);
    }

    // Show modal
    modal.classList.add('show');
}

// Handle quest checkbox toggle
function handleQuestToggle(e) {
    const questItem = e.target.closest('.quest-item');
    const questId = questItem.dataset.questId;
    
    questProgress[questId] = e.target.checked;
    questItem.classList.toggle('completed', e.target.checked);
    
    // Save progress
    localStorage.setItem('az140QuestProgress', JSON.stringify(questProgress));
    
    // Update mastery button
    const allQuests = getAllQuestsForSkill(currentSkill);
    const completedQuests = allQuests.filter(qId => questProgress[qId]).length;
    const isComplete = completedQuests === allQuests.length && allQuests.length > 0;
    
    const masteryBtn = document.getElementById('masteryBtn');
    if (masteryBtn) {
        const skillElement = document.querySelector(`[data-skill="${currentSkill}"]`);
        const isSkillLocked = skillElement && skillElement.classList.contains('locked');
        
        masteryBtn.disabled = !isComplete || isSkillLocked;
        masteryBtn.textContent = `${unlockedSkills[currentSkill] ? '✅ Skill Mastered!' : 'Mark as Mastered'} (${completedQuests}/${allQuests.length} quests)`;
    }
    
    updateQuestCount();
}

// Get all quest IDs for a skill
function getAllQuestsForSkill(skillId) {
    const skillData = skillQuests[skillId];
    if (!skillData || !skillData.quests) return [];
    
    const questIds = [];
    Object.keys(skillData.quests).forEach(section => {
        if (Array.isArray(skillData.quests[section])) {
            skillData.quests[section].forEach((_, index) => {
                questIds.push(`${skillId}-${section}-${index}`);
            });
        }
    });
    return questIds;
}

// Handle skill mastery
function handleMastery() {
    const skillElement = document.querySelector(`[data-skill="${currentSkill}"]`);
    
    if (!skillElement || skillElement.classList.contains('locked')) {
        alert('This skill is locked! Complete more skills in the previous tier first.');
        return;
    }
    
    if (!unlockedSkills[currentSkill]) {
        unlockedSkills[currentSkill] = true;
        if (skillElement) {
            skillElement.classList.add('unlocked');
        }
    } else {
        unlockedSkills[currentSkill] = false;
        if (skillElement) {
            skillElement.classList.remove('unlocked');
        }
    }
    
    // Save progress
    localStorage.setItem('az140SkillTree', JSON.stringify(unlockedSkills));
    updateProgress();
    checkTierUnlocking();
    
    // Update button text
    const masteryBtn = document.getElementById('masteryBtn');
    if (masteryBtn) {
        masteryBtn.textContent = unlockedSkills[currentSkill] ? '✅ Skill Mastered!' : 'Mark as Mastered';
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('questModal');
    if (modal) {
        modal.classList.remove('show');
    }
    currentSkill = null;
}

// Restore unlocked skills from localStorage
function restoreUnlockedSkills() {
    Object.keys(unlockedSkills).forEach(skillId => {
        const skillElement = document.querySelector(`[data-skill="${skillId}"]`);
        if (skillElement && unlockedSkills[skillId]) {
            skillElement.classList.add('unlocked');
        }
    });
}

// Update progress bar and stats
function updateProgress() {
    const totalSkills = document.querySelectorAll('.skill').length;
    const unlockedCount = Object.values(unlockedSkills).filter(v => v).length;
    const percentage = totalSkills > 0 ? Math.round((unlockedCount / totalSkills) * 100) : 0;
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const unlockedCountEl = document.getElementById('unlockedCount');
    const totalCountEl = document.getElementById('totalCount');
    
    if (progressFill) progressFill.style.width = percentage + '%';
    if (progressText) progressText.textContent = percentage + '% Complete';
    if (unlockedCountEl) unlockedCountEl.textContent = unlockedCount;
    if (totalCountEl) totalCountEl.textContent = totalSkills;
}

// Update quest count
function updateQuestCount() {
    const totalQuests = Object.keys(questProgress).filter(k => questProgress[k]).length;
    const questsCompleteEl = document.getElementById('questsComplete');
    if (questsCompleteEl) {
        questsCompleteEl.textContent = totalQuests;
    }
}

// Check and unlock tiers based on progress
function checkTierUnlocking() {
    const tiers = [1, 2, 3, 4, 5];
    
    tiers.forEach((tier, index) => {
        if (index === 0) return; // First tier is always unlocked
        
        const previousTierSkills = document.querySelectorAll(`.skill[data-tier="${tier - 1}"]`);
        const currentTierSkills = document.querySelectorAll(`.skill[data-tier="${tier}"]`);
        
        const unlockedInPrevious = Array.from(previousTierSkills).filter(s => 
            s.classList.contains('unlocked')
        ).length;
        
        // Unlock tier if 80% of previous tier is complete
        const requiredSkills = Math.floor(previousTierSkills.length * 0.8);
        const shouldUnlock = unlockedInPrevious >= requiredSkills;
        
        currentTierSkills.forEach(skill => {
            if (shouldUnlock) {
                skill.classList.remove('locked');
            } else {
                // Only lock if not already unlocked
                if (!skill.classList.contains('unlocked')) {
                    skill.classList.add('locked');
                }
            }
        });
        
        // Update tier visual indicator
        const tierElement = document.querySelector(`.tier-${tier}`);
        if (tierElement) {
            if (shouldUnlock) {
                tierElement.style.opacity = '1';
            } else {
                tierElement.style.opacity = '0.8';
            }
        }
    });
}

// Export progress function
function exportProgress() {
    const data = {
        skills: unlockedSkills,
        quests: questProgress,
        date: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'az140-progress.json';
    a.click();
}

// Import progress function
function importProgress(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.skills) unlockedSkills = data.skills;
            if (data.quests) questProgress = data.quests;
            
            localStorage.setItem('az140SkillTree', JSON.stringify(unlockedSkills));
            localStorage.setItem('az140QuestProgress', JSON.stringify(questProgress));
            
            initSkillTree();
            alert('Progress imported successfully!');
        } catch (error) {
            alert('Error importing progress: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Reset progress function
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
        unlockedSkills = {};
        questProgress = {};
        localStorage.removeItem('az140SkillTree');
        localStorage.removeItem('az140QuestProgress');
        location.reload();
    }
}
