// Carousel Image Generator JavaScript

class CarouselGenerator {
	constructor() {
		this.slides = [
			{
				id: 1,
				type: 'header', // 'header' or 'content'
				title: 'Your Title Here',
				content: ''
			}
		];
		this.currentSlideIndex = 0;
		this.slideIdCounter = 1;

		this.init();
	}

	init() {
		this.bindEvents();
		this.renderSlidesList();
		this.updatePreview();
		this.updateNavigation();
	}

	bindEvents() {
		// Add slide button
		document.getElementById('addSlideBtn').addEventListener('click', () => {
			this.addSlide();
		});

		// Navigation buttons
		document.getElementById('prevSlideBtn').addEventListener('click', () => {
			this.previousSlide();
		});

		document.getElementById('nextSlideBtn').addEventListener('click', () => {
			this.nextSlide();
		});

		// Export PDF button
		document.getElementById('exportPdfBtn').addEventListener('click', () => {
			this.exportToPDF();
		});
	}

	addSlide() {
		this.slideIdCounter++;
		const newSlide = {
			id: this.slideIdCounter,
			type: 'content',
			title: 'New Slide Title',
			content: 'Add your content here...'
		};

		this.slides.push(newSlide);
		this.renderSlidesList();
		this.updateNavigation();

		// Switch to the new slide
		this.currentSlideIndex = this.slides.length - 1;
		this.updatePreview();
		this.updateActiveSlide();
	}

	removeSlide(slideId) {
		if (this.slides.length <= 1) {
			alert('You must have at least one slide.');
			return;
		}

		const slideIndex = this.slides.findIndex(slide => slide.id === slideId);
		if (slideIndex === -1) return;

		this.slides.splice(slideIndex, 1);

		// Adjust current slide index if necessary
		if (this.currentSlideIndex >= this.slides.length) {
			this.currentSlideIndex = this.slides.length - 1;
		} else if (this.currentSlideIndex > slideIndex) {
			this.currentSlideIndex--;
		}

		this.renderSlidesList();
		this.updatePreview();
		this.updateNavigation();
		this.updateActiveSlide();
	}

	updateSlide(slideId, field, value) {
		const slide = this.slides.find(s => s.id === slideId);
		if (slide) {
			slide[field] = value;

			// If this is the current slide, update preview
			const currentSlide = this.slides[this.currentSlideIndex];
			if (currentSlide && currentSlide.id === slideId) {
				this.updatePreview();
			}
		}
	}

	switchSlideType(slideId, type) {
		const slide = this.slides.find(s => s.id === slideId);
		if (slide) {
			slide.type = type;

			// If switching to header type, clear content
			if (type === 'header') {
				slide.content = '';
			}

			this.renderSlidesList();

			// If this is the current slide, update preview
			const currentSlide = this.slides[this.currentSlideIndex];
			if (currentSlide && currentSlide.id === slideId) {
				this.updatePreview();
			}
		}
	}

	selectSlide(index) {
		this.currentSlideIndex = index;
		this.updatePreview();
		this.updateActiveSlide();
		this.updateNavigation();
	}

	previousSlide() {
		if (this.currentSlideIndex > 0) {
			this.currentSlideIndex--;
			this.updatePreview();
			this.updateActiveSlide();
			this.updateNavigation();
		}
	}

	nextSlide() {
		if (this.currentSlideIndex < this.slides.length - 1) {
			this.currentSlideIndex++;
			this.updatePreview();
			this.updateActiveSlide();
			this.updateNavigation();
		}
	}

	renderSlidesList() {
		const slidesList = document.getElementById('slidesList');
		slidesList.innerHTML = '';

		this.slides.forEach((slide, index) => {
			const slideElement = this.createSlideElement(slide, index);
			slidesList.appendChild(slideElement);
		});
	}

	createSlideElement(slide, index) {
		const slideDiv = document.createElement('div');
		slideDiv.className = 'slide-item';
		slideDiv.dataset.slideId = slide.id;
		slideDiv.dataset.slideIndex = index;

		slideDiv.innerHTML = `
			<div class="slide-item-header">
				<span class="slide-item-title">Slide ${index + 1}</span>
				<button class="btn btn-danger" onclick="generator.removeSlide(${slide.id})">Delete</button>
			</div>

			<div class="slide-type-toggle">
				<button class="toggle-btn ${slide.type === 'header' ? 'active' : ''}" 
						onclick="generator.switchSlideType(${slide.id}, 'header')">
					Header Slide
				</button>
				<button class="toggle-btn ${slide.type === 'content' ? 'active' : ''}" 
						onclick="generator.switchSlideType(${slide.id}, 'content')">
					Content Slide
				</button>
			</div>

			<div class="form-group">
				<label class="form-label">Title</label>
				<input type="text" class="form-input" value="${slide.title}" 
					   oninput="generator.updateSlide(${slide.id}, 'title', this.value)"
					   placeholder="Enter slide title">
			</div>

			${slide.type === 'content' ? `
				<div class="form-group">
					<label class="form-label">Content</label>
					<textarea class="form-input form-textarea" 
							  oninput="generator.updateSlide(${slide.id}, 'content', this.value)"
							  placeholder="Enter slide content">${slide.content}</textarea>
				</div>
			` : ''}
		`;

		// Add click event to select slide
		slideDiv.addEventListener('click', (e) => {
			// Don't select if clicking on buttons or inputs
			if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
				return;
			}
			this.selectSlide(index);
		});

		return slideDiv;
	}

	updatePreview() {
		const currentSlide = this.slides[this.currentSlideIndex];
		if (!currentSlide) return;

		const slidePreview = document.getElementById('slidePreview');
		const slideContent = slidePreview.querySelector('.slide-content');

		const titleElement = slideContent.querySelector('.slide-title');
		const textElement = slideContent.querySelector('.slide-text');
		const numberElement = slideContent.querySelector('.slide-number');

		titleElement.textContent = currentSlide.title || 'Your Title Here';

		if (currentSlide.type === 'header') {
			textElement.style.display = 'none';
		} else {
			textElement.style.display = 'block';
			textElement.textContent = currentSlide.content || 'Your content here';
		}

		numberElement.textContent = `${this.currentSlideIndex + 1} / ${this.slides.length}`;
	}

	updateActiveSlide() {
		// Remove active class from all slides
		document.querySelectorAll('.slide-item').forEach(item => {
			item.classList.remove('active');
		});

		// Add active class to current slide
		const currentSlideElement = document.querySelector(`[data-slide-index="${this.currentSlideIndex}"]`);
		if (currentSlideElement) {
			currentSlideElement.classList.add('active');
			currentSlideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}

	updateNavigation() {
		const prevBtn = document.getElementById('prevSlideBtn');
		const nextBtn = document.getElementById('nextSlideBtn');
		const counter = document.getElementById('slideCounter');

		prevBtn.disabled = this.currentSlideIndex === 0;
		nextBtn.disabled = this.currentSlideIndex === this.slides.length - 1;
		counter.textContent = `${this.currentSlideIndex + 1} / ${this.slides.length}`;
	}

	async exportToPDF() {
		const exportBtn = document.getElementById('exportPdfBtn');
		const originalText = exportBtn.textContent;

		try {
			exportBtn.textContent = 'Generating PDF...';
			exportBtn.disabled = true;
			exportBtn.classList.add('loading');

			// Create PDF using jsPDF
			const { jsPDF } = window.jspdf;
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'px',
				format: [800, 800]
			});

			for (let i = 0; i < this.slides.length; i++) {
				const slide = this.slides[i];

				// Create a temporary slide element for PDF
				const tempSlide = this.createPDFSlide(slide, i + 1);
				document.body.appendChild(tempSlide);

				try {
					// Convert to canvas using html2canvas
					const canvas = await html2canvas(tempSlide, {
						width: 800,
						height: 800,
						scale: 2,
						backgroundColor: null,
						logging: false,
						useCORS: true,
						allowTaint: true,
						dpi: 300,
						letterRendering: true
					});

					// Add page to PDF (except for first slide)
					if (i > 0) {
						pdf.addPage();
					}

					// Add image to PDF with higher quality
					const imgData = canvas.toDataURL('image/png', 1.0);
					pdf.addImage(imgData, 'PNG', 0, 0, 800, 800, undefined, 'FAST');

				} catch (error) {
					console.error('Error generating slide:', error);
				} finally {
					// Remove temporary element
					document.body.removeChild(tempSlide);
				}
			}

			// Save the PDF
			pdf.save('carousel-slides.pdf');

		} catch (error) {
			console.error('Error generating PDF:', error);
			alert('Error generating PDF. Please try again.');
		} finally {
			exportBtn.textContent = originalText;
			exportBtn.disabled = false;
			exportBtn.classList.remove('loading');
		}
	}

	createPDFSlide(slide, slideNumber) {
		const slideDiv = document.createElement('div');
		slideDiv.className = 'pdf-slide';

		slideDiv.innerHTML = `
			<div class="slide-content">
				<h1 class="slide-title">${slide.title || 'Your Title Here'}</h1>
				${slide.type === 'content' ? `<p class="slide-text">${slide.content || 'Your content here'}</p>` : ''}
				<div class="slide-number">${slideNumber} / ${this.slides.length}</div>
			</div>
		`;

		slideDiv.style.position = 'absolute';
		slideDiv.style.left = '-9999px';
		slideDiv.style.top = '-9999px';

		return slideDiv;
	}
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	window.generator = new CarouselGenerator();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
	if (!window.generator) return;

	// Arrow keys for navigation (when not focused on input)
	if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			window.generator.previousSlide();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			window.generator.nextSlide();
		}
	}

	// Ctrl/Cmd + N for new slide
	if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
		e.preventDefault();
		window.generator.addSlide();
	}

	// Ctrl/Cmd + E for export
	if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
		e.preventDefault();
		window.generator.exportToPDF();
	}
});

